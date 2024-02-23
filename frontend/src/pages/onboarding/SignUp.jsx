import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useSingUpMutation } from '../../redux/api/auth';
import { signUpSchema } from '../../utils/Validations/authValidator';
import { setCredential } from '../../redux/slice/user';
import TextField from '../../components/TextField';

export const SignUp = ({ setStage }) => {
  const navigation = useNavigate();
  const token = useSelector((state) => state.user.token);
  if (token) {
    navigation('/');
  }

  const dispatch = useDispatch();
  let [singUp] = useSingUpMutation();

  let handleSubmit = async (values, actions) => {
    try {
      console.log(values);
      const result = await singUp(values).unwrap();
      dispatch(setCredential(result));
      actions.resetForm();
      actions.setStatus({
        sent: true,
        msg: 'Login successful!',
      });
      navigation('/');
    } catch ({ status, data: { detail } }) {
      actions.setStatus({
        sent: false,
        msg: detail, // Customize your error message based on the error structure
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      role: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <div>
        <div className="-mt-2 h-12">
          {formik.status && formik.status.msg && (
            <p
              className={`  italic text-center text-lg font-bold p-3 ${
                formik.status.sent ? 'text-success ' : 'text-error'
              }`}
            >
              {formik.status.msg}
            </p>
          )}
        </div>
        <div>
          <TextField
            formik={formik}
            label={'username'}
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
            label={'email'}
            type="email"
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
          <div className="text-base-content/70 p-1 font-thin capitalize">
            select a role
          </div>
          <select
            name="role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
            className="select select-bordered w-full text-[#babbbb] capitalize"
          >
            <option disabled value="">
              select a role
            </option>
            <option value="Requester">Requester</option>
            <option value="SysAdmin">SysAdmin</option>
            <option value="Helpdesk Agent">Helpdesk Agent</option>
          </select>
          {formik.touched.role && formik.errors.role ? (
            <div className=" text-error italic p-2 pb-0">
              {formik.errors.role}
            </div>
          ) : null}

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
      <div className="self-end"></div>

      <div className="divider"></div>
      <div className="flex flex-row space-x-3 self-end">
        {(formik.values.password || formik.values.username) && (
          <button
            type="reset"
            className="btn btn-secondary btn-md btn-outline"
            disabled={formik.isSubmitting}
            onClick={() => {
              formik.resetForm();
            }}
          >
            Clear
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary text-base-100 btn-md btn-outline"
          disabled={formik.isSubmitting}
          onClick={() => setStage(false)}
        >
          Back
        </button>
        <button type="submit" className="btn btn-accent ">
          Sign Up
        </button>
      </div>
    </form>
  );
};
