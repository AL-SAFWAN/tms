import { useFormik } from 'formik';
import { useCreateTicketMutation } from '../../redux/api/ticket';
import TextField from '../../components/TextField';

export const Form = () => {
  let [createTicket] = useCreateTicketMutation();

  let handleSubmit = async (values, actions) => {
    try {
      const result = await createTicket(values).unwrap();
      actions.resetForm();
      actions.setStatus({
        sent: true,
        msg: result?.title + ' Created!',
      });
      setTimeout(() => {
        actions.setStatus({
          sent: true,
          msg: '',
        });
      }, 1500);
    } catch ({ status, data }) {
      actions.setStatus({
        sent: false,
        msg: data.detail.map((e) => e.msg).join(),
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
      title: '',
      description: '',
      status: 'Open',
      priority: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <div>
        <div className="-mt-2 ">
          {formik.status && formik.status.msg && (
            <p
              className={`  italic text-center text-lg font-bold p-3 capitalize ${
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
            label={'title'}
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
            Description
          </div>

          <textarea
            id="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            placeholder="description"
            className="textarea textarea-bordered textarea-lg w-full max"
          ></textarea>

          <div className="text-base-content/70 p-1 font-thin capitalize">
            Priority
          </div>
          <select
            id="priority"
            name="priority"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.priority}
            className="select select-bordered w-full text-[#babbbb] capitalize"
          >
            {formik.touched.role && formik.errors.role ? (
              <div className=" text-error italic p-2 pb-0">
                {formik.errors.description}
              </div>
            ) : null}

            <option disabled value="">
              select priority
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {formik.touched.role && formik.errors.role ? (
            <div className=" text-error italic p-2 pb-0">
              {formik.errors.role}
            </div>
          ) : null}
        </div>
      </div>
      <div className="self-end"></div>

      <div className="divider"></div>
      <div className="flex flex-row space-x-3 self-end">
        {(formik.values.title || formik.values.description) && (
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
          type="submit"
          className="btn btn-primary text-base-100"
          disabled={formik.isSubmitting}
        >
          Create Ticket
        </button>
      </div>
    </form>
  );
};
