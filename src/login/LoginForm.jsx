/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import TextField from '@atlaskit/textfield';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Form, {
  CheckboxField,
  Field,
  FormFooter,
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

const LoginForm = (props) => (
  <div css={Styles.Form}>
    <Form onSubmit={props.onSubmit}>
      {({ formProps }) => (
        <form {...formProps}>
          <Field name="email" isRequired defaultValue="andreas.safe@gmail.com">
            {({ fieldProps, error }) => (
              <div css={Styles.FieldWrapper}>
                <TextField type="email" autoComplete="off" placeholder="Enter email"  {...fieldProps} />
              </div>
            )}
          </Field>
          <Field
            name="password"
            defaultValue="testtest"
            isRequired
            validate={value => (value.length < 4 ? 'TOO_SHORT' : undefined)}
          >
            {({ fieldProps, error, meta }) => (
              <div css={Styles.FieldWrapper}>
                <TextField type="password" placeholder="Enter your secret password" {...fieldProps} />
              </div>
            )}
          </Field>
          <CheckboxField name="remember" label="Remember me" defaultIsChecked>
            {({ fieldProps }) => (
              <Checkbox {...fieldProps} label="Always sign in on this device" />
            )}
          </CheckboxField>
          {props.error && (
            <div css={Styles.ErrorWrapper}>
              <ErrorIcon />
              <span className="message">Invalid credentials, please change and re-try.</span>
            </div>
          )}
          <FormFooter>
            <ButtonGroup>
              <Button appearance="subtle">Cancel</Button>
              <Button type="submit" appearance="primary" isLoading={props.submitting}>
                Login
              </Button>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  </div>
);

export default LoginForm;
