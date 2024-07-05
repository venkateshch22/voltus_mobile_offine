import {StyleSheet, View} from 'react-native';
import React from 'react';
import {IconButton, Text, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import WebView from 'react-native-webview';
import {v4 as uuid} from 'uuid';
import {insertDataInResponsesTable} from '../sqlite/insertOrUpdateDataInTables';
import toastMessage from '../commonFunctions/toastMessage';

const AddReportScreen = ({navigation, route}) => {
  const {formId} = route.params;
  const theme = useTheme();
  const forms = useSelector(state => state.forms.forms);
  const formSelected = forms.filter(form => form.formId === formId);

  const formResponseHandler = response => {
    console.log(response);
    // console.log(formSelected[0].formId);
    const responseId = uuid();
    const formId = formSelected[0].formId;
    const createdTime = new Date().toISOString();
    console.log(createdTime);
    insertDataInResponsesTable(
      responseId,
      formId,
      JSON.stringify(response),
      createdTime,
      0,
    );
    toastMessage('Report added successfully..!!')
    navigation.navigate('SubmittedReports', {
      formId: formId,
      responseId: responseId,
    });
  };

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
        <Text>Add Report</Text>
      </View>

      <WebView
        source={{uri: 'file:///android_asset/web/index.html'}}
        javaScriptEnabled={true}
        originWhitelist={['*']}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onMessage={({nativeEvent}) => {
          const formResponse = JSON.parse(nativeEvent.data);
          formResponseHandler(formResponse);
        }}
        injectedJavaScriptObject={{
          form: formSelected[0].formJson,
          theme: JSON.parse(formSelected[0].themeJson),
        }}
      />
    </View>
  );
};

export default AddReportScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: '#93b1a7',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
