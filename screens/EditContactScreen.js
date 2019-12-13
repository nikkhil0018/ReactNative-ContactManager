import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Alert
} from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';

export default class EditContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      phone: '',
      email: '',
      address: '',
      key: ''
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      var key = this.props.navigation.getParam('key', '');
      //Populate state with key
      this.getContact(key);
    });
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then(contactJsonString => {
        var contact = JSON.parse(contactJsonString);
        // Set key in this object
        contact['key'] = key;
        this.setState(contact);
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateContact = async key => {
    if (
      this.state.fname !== '' &&
      this.state.lname !== '' &&
      this.state.phone !== '' &&
      this.state.email !== '' &&
      this.state.address !== ''
    ) {
      var contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      };
    }
    await AsyncStorage.mergeItem(key, JSON.stringify(contact))
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  static navigationOptions = {
    title: 'Edit Contact'
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <Form>
            <Item>
              <Label style={styles.inputItem}>First Name:</Label>
              <Input
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                onChangeText={fname => this.setState({ fname: fname })}
                value={this.state.fname}
              />
            </Item>
            <Item>
              <Label style={styles.inputItem}>Lasr Name:</Label>
              <Input
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                onChangeText={lname => this.setState({ lname: lname })}
                value={this.state.lname}
              />
            </Item>
            <Item>
              <Label style={styles.inputItem}>Phone:</Label>
              <Input
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                onChangeText={phone => this.setState({ phone: phone })}
                value={this.state.phone}
              />
            </Item>
            <Item>
              <Label style={styles.inputItem}>Email:</Label>
              <Input
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                onChangeText={email => this.setState({ email: email })}
                value={this.state.email}
              />
            </Item>
            <Item>
              <Label style={styles.inputItem}>Address:</Label>
              <Input
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='default'
                onChangeText={address => this.setState({ address: address })}
                value={this.state.address}
              />
            </Item>
          </Form>
          <Button
            style={styles.button}
            full
            rounded
            onPress={() => {
              this.updateContact(this.state.key);
            }}
          >
            <Text style={styles.buttonText}>Update</Text>
          </Button>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: '#B83227',
    marginTop: 40
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
