import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {useState, useEffect} from 'react';
import {Text, useTheme, Surface, IconButton,Icon} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getFormsFromTablesByAppId} from '../sqlite/getDataFromTables';
import {initForms} from '../store/slices/formsSlice';

const FormsScreen = ({navigation, route}) => {
  const {appId} = route.params;
  const dispatch = useDispatch();
  const [forms, setForms] = useState([]);
  const theme = useTheme();

  const getForms = async () => {
    const appForms = await getFormsFromTablesByAppId(appId);
    setForms(appForms);
    dispatch(initForms(appForms));
  };

  useEffect(() => {
    getForms();
  }, [appId]);
  
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: theme.colors.primaryContainer,
          elevation: 3,
        }}>
        <IconButton
          icon="arrow-left"
          size={25}
          onPress={() => navigation.goBack()}
        />
        <Text>Forms</Text>
      </View>
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          gap: 30,
          justifyContent: 'flex-start',
          margin: 25,
          flexWrap: 'wrap',
        }}>
        {forms?.length > 0 &&
          forms?.map(form => (
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() =>
                navigation.navigate('SubmittedReports', {
                  formId: form.formId,
                })
              }
              key={form.formId}>
              <Surface
                elevation={2}
                style={{
                  backgroundColor: theme.colors.primary,
                  width: 100,
                  height: 100,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  variant="bodyMedium"
                  style={{textAlign: 'center', color: theme.colors.onPrimary}}>
                  {form.formName}
                </Text>
              </Surface>
            </TouchableOpacity>
          ))}
      </View>
      {!forms?.length > 0 && (
        <View style={{flex: 1, alignItems: 'center',marginTop:'50%'}}>
          <View
            style={{
              width: 150,
              height: 150,
              backgroundColor: theme.colors.surfaceVariant,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 6,
            }}>
            <Icon source="text" color={theme.colors.secondary} size={100} />
          </View>
          <Text
            variant="titleMedium"
            style={{marginTop: 5, color: theme.colors.secondary}}>
            No Forms
          </Text>
        </View>
      )}
    </View>
  );
};

export default FormsScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: '#93b1a7',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
