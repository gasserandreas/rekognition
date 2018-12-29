/** @jsx jsx */
import { Component } from 'react';
import { jsx, css } from '@emotion/core';

import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Form, {
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  FormSection,
  FormHeader,
} from '@atlaskit/form';

import { Colors } from '../styles';

const Styles = {
  Form: css`
    display: flex;
    margin: 0 auto;
    flex-direction: column;
  `,
  FieldWrapper: css`
    margin-bottom: 1rem;
  `,
  ErrorWrapper: css`
    color: ${Colors.Red.default};
    padding: 1rem 0;
    display: flex;
    justify-content: start;
    align-items: center;

    .message {
      margin-left: 0.5rem;
    }
  `,
};

class CheckEmailForm extends Component {
  validateEmailInput = this.validateEmailInput.bind(this);
  onValidateEmail = this.onValidateEmail.bind(this);

  state = {
    email: '',
  };

  validateEmailInput(value) {
    return !this.validateEmail(value) ? 'INVALID_EMAIL' : undefined;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onValidateEmail({ email }) {
    // save email data
    this.setState({ email });

    this.props.onSubmit(email);
  }


  render() {
    const { submitting, validEmail } = this.props;
    return (
      <div css={Styles.Form}>
        <Form onSubmit={this.onValidateEmail}>
          {({ formProps }) => (
            <form {...formProps}>
              <FormHeader title="Create a new account" />
              <FormSection>
                <h4>Base information</h4>
                <Field name="email" isRequired defaultValue="" validate={this.validateEmailInput}>
                  {({ fieldProps, error }) => (
                    <div css={Styles.FieldWrapper}>
                      <TextField type="email" autoComplete="off" placeholder="Enter email"  {...fieldProps} />
                        {!error && (
                          <HelperMessage>
                            You can only use letters, numbers & periods.
                          </HelperMessage>
                        )}
                        {error && (
                          <ErrorMessage>
                            This email is not valid.
                          </ErrorMessage>
                        )}
                    </div>
                  )}
                </Field>
              </FormSection>
              {validEmail === false && (
                <div css={Styles.ErrorWrapper}>
                  <ErrorIcon />
                  <span className="message">Email is already in use.</span>
                </div>
              )}
              <FormFooter>
                <ButtonGroup>
                  <Button type="submit" appearance="primary" isLoading={submitting}>
                    CheckEmail
                  </Button>
                </ButtonGroup>
              </FormFooter>
            </form>
          )}
        </Form>
      </div>
    );
  }
}

export default CheckEmailForm;
