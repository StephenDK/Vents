// 16.1 this is the start of the basics page
// first we want to bring in the user data to display in the form
// 16.2 head to SettingsDashboard.jsx to pass user data into this component
import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import DateInput from "../../../common/form/DateInput";
import PlaceInput from "../../../common/form/PlaceInput";
import TextInput from "../../../common/form/TextInput";

class BasicPage extends Component {

    render() {
        const {pristine, submitting} = this.props;
        return (
            <Segment>
                <Header dividing size='large' content='Basics' />
                <Form>
                    <Field
                        width={8}
                        name='displayName'
                        type='text'
                        component={TextInput}
                        placeholder='Known As'
                    />
                    <Form.Group inline>
                      {/* todo: Gender Radio button */}
                    </Form.Group>
                    <Field
                        width={8}
                        name='dateOfBirth'
                        component={DateInput}
                        placeholder='Date of Birth'
                    />
                    <Field
                        name='city'
                        placeholder='Home Town'
                        options={{types: ['(cities)']}}
                        label='Female'
                        component={PlaceInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' positive content='Update Profile'/>
                </Form>
            </Segment>
        );
    }
}
// 16.5 this component wont render the user data as placeholder text when it loads
// we must enable enableReinitialize : true in conecting this component to
// redux form
export default reduxForm({form: 'userProfile', enableReinitialize: true})(BasicPage);