import React from 'react';

export default function TextField({
  formik,
  label,
  type = 'text',
  Icon = <></>,
}) {
  return (
    <>
      <div className="text-base-content/70 p-1 font-thin capitalize">
        {label}
      </div>
      <label className="input input-bordered flex items-center gap-2">
        {Icon}
        <input
          type={type}
          className="grow"
          placeholder={label}
          id={label}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[label]}
        />
      </label>
      {formik.touched[label] && formik.errors[label] ? (
        <div className="text-error  italic p-2 pb-0">
          {formik.errors[label]}
        </div>
      ) : null}
    </>
  );
}
