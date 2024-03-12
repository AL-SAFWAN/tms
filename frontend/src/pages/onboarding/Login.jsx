import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { loginSchema } from '../../utils/Validations/authValidator';
import { useLoginMutation } from '../../redux/api/auth';
import { setCredential } from '../../redux/slice/user';
import TextField from '../../components/TextField';

export const Login = ({ setStage }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const token = useSelector((state) => state.user.token);
  if (token) {
    navigation(from);
  }

  const dispatch = useDispatch();
  let [login] = useLoginMutation();

  let handleSubmit = async (values, actions) => {
    try {
      const result = await login(values).unwrap();
      dispatch(setCredential(result));
      // REDIRECT HERE
      actions.resetForm();
      actions.setStatus({
        sent: true,
        msg: 'Login successful!',
      });
      navigation(from);
    } catch ({ status, data: { detail } }) {
      actions.setStatus({
        sent: false,
        msg: detail, // Customize your error message based on the error structure
      });
      setTimeout(() => {
        actions.setStatus({
          sent: false,
          msg: '',
        });
      }, 1500);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <div>
        {formik.status && formik.status.msg && (
          <div className="alert alert-error p-2 my-3 mt-6 capitalize">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <p className={`font-semibold `}>{formik.status.msg}</p>
          </div>
        )}
        {/* <div className="-mt-2 h-12">
          {formik.status && formik.status.msg && (
            <p
              className={`  italic text-center text-lg font-bold p-3 ${
                formik.status.sent ? 'text-success ' : 'text-error'
              }`}
            >
              {formik.status.msg}
            </p>
          )}
        </div> */}
        <div>
          <TextField
            formik={formik}
            type="email"
            label={'email'}
            Icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
            }
          />
          <TextField
            formik={formik}
            label={'password'}
            type="password"
            Icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </div>
      </div>
      {/* <div className="self-end">
        {(formik.values.password || formik.values.username) && (
          <button
            type="reset"
            className="btn btn-secondary btn-md -mb-8 mt-2"
            disabled={formik.isSubmitting}
            onClick={() => {
              formik.resetForm();
            }}
          >
            Clear
          </button>
        )}
      </div> */}

      <div className="divider"></div>
      <div className="flex flex-col space-y-3">
        <button
          type="submit"
          className="btn btn-primary text-base-100 btn-md"
          disabled={formik.isSubmitting}
        >
          Login
        </button>
        <button
          type="reset"
          className="btn btn-accent btn-outline"
          onClick={() => setStage(true)}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};
