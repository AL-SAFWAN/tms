import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useSingUpMutation } from '../../redux/api/auth';
import {
  signUpSchema,
  updateUserSchema,
} from '../../utils/Validations/authValidator';
import { setCredential } from '../../redux/slice/user';
import TextField from '../../components/TextField';
import {
  adminApi,
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../redux/api/admin';
import { useEffect, useState } from 'react';
import { ticketApi } from '../../redux/api/ticket';

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
        msg: detail,
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

export const CreateUser = () => {
  const dispatch = useDispatch();
  let [singUp] = useSingUpMutation();

  let handleSubmit = async (values, actions) => {
    try {
      const result = await singUp(values).unwrap();
      actions.resetForm();
      actions.setStatus({
        sent: true,
        msg: 'Create User successfully!',
      });
      dispatch(adminApi.util.invalidateTags(['admin']));
    } catch ({ status, data: { detail } }) {
      actions.setStatus({
        sent: false,
        msg: detail,
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
    <form onSubmit={formik.handleSubmit} className="flex flex-col ">
      <div>
        {formik.status && formik.status.msg && (
          <p
            className={`  italic text-center text-lg font-bold p-3 ${
              formik.status.sent ? 'text-success ' : 'text-error'
            }`}
          >
            {formik.status.msg}
          </p>
        )}
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
            className="btn btn-accent btn-md btn-outline"
            disabled={formik.isSubmitting}
            onClick={() => {
              formik.resetForm();
            }}
          >
            Clear
          </button>
        )}

        <button type="submit" className="btn btn-primary ">
          Submit
        </button>
      </div>
    </form>
  );
};

export const UpdateUser = ({ userId }) => {
  let { data, isLoading } = useGetUserQuery(userId);
  const dispatch = useDispatch();
  let [updateUser] = useUpdateUserMutation();
  let [hasChanged, setHasChanged] = useState(false);

  let handleSubmit = async (values, actions) => {
    try {
      await updateUser({
        id: data?.id,
        body: values,
      }).unwrap();
      // actions.resetForm();
      actions.setStatus({
        sent: true,
        msg: 'Updated User successfully!',
      });
      dispatch(adminApi.util.invalidateTags(['admin']));
      dispatch(ticketApi.util.invalidateTags(['Tickets']));
    } catch ({ status, data: { detail } }) {
      actions.setStatus({
        sent: false,
        msg: detail,
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
    },
    validationSchema: updateUserSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (data) {
      formik.setFieldValue('username', data.username);
      formik.setFieldValue('email', data.email);
      formik.setFieldValue('role', data.role);
    }
  }, [formik.values, data]);
  useEffect(() => {
    if (data) {
      const changed =
        formik.values.username !== data.username ||
        formik.values.email !== data.email ||
        formik.values.role !== data.role;
      setHasChanged(changed);
    }
  }, [formik.values, data]);

  if (isLoading) return;
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col ">
      <div>
        {formik.status && formik.status.msg && (
          <p
            className={`  italic text-center text-lg font-bold p-3 ${
              formik.status.sent ? 'text-success ' : 'text-error'
            }`}
          >
            {formik.status.msg}
          </p>
        )}
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
        </div>
      </div>

      <br />
      <div className="flex flex-row space-x-3 self-end">
        {hasChanged && (
          <>
            <button
              type="reset"
              className="btn btn-accent btn-md btn-outline"
              disabled={formik.isSubmitting}
              onClick={() => {
                formik.resetForm();
              }}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-primary ">
              Save
            </button>
          </>
        )}
      </div>
    </form>
  );
};
