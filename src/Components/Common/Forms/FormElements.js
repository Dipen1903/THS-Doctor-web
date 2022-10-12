import React, { useEffect, useMemo, useState } from "react";
import { Field, ErrorMessage, FieldArray } from "formik";
import ReactSelect, { components } from "react-select";
import { BackGround, Icon } from "../../../Utilities/Icons";
const CustomOption = (props) => {
  const { innerProps, isDisabled, children } = props;
  return !isDisabled ? (
    <div className="my-select__option" {...innerProps}>
      {children}
    </div>
  ) : null;
};
const DropdownIndicator = ({ iconHide, customIcon, ...props }) => {
  return (
    <components.DropdownIndicator {...props}>
      {iconHide ? (
        <></>
      ) : customIcon ? (
        <img alt="myImg" src={customIcon} />
      ) : (
        <img alt="myImg" src={Icon.Search} />
      )}
    </components.DropdownIndicator>
  );
};
const MultiValueRemove = (props) => {
  return (
    <components.MultiValueRemove {...props}>
      <img alt="myImg" height={16} width={16} src={Icon.CrossWhite} />
    </components.MultiValueRemove>
  );
};

function Input(props) {
  const {
    name,
    label,
    iconHide,
    outerClass,
    labelclass,
    icon,
    type,
    id,
    ...rest
  } = props;
  const [visible, setVisible] = useState(undefined);
  return (
    <>
      {label ? (
        <label className={`sign_title ${labelclass}`} htmlFor={id || ""}>
          {label}
        </label>
      ) : (
        <></>
      )}
      <div className={`input_box form_group ${outerClass || ""}`}>
        {icon ? <img src={icon} alt="icon" /> : <></>}
        <Field name={name} type={visible || type} id={id || ""} {...rest} />
        {type === "password" && !iconHide ? (
          <i
            onClick={() => setVisible(visible ? undefined : "text")}
            className={`toggle-password fa fa-fw ${
              visible ? "fa-eye" : "fa-eye-slash"
            }`}
          ></i>
        ) : (
          <></>
        )}
      </div>
      <div className="error">
        <ErrorMessage name={name} />
      </div>
    </>
  );
}

function TextArea(props) {
  const { name, label, id, ...rest } = props;
  return (
    <div className="form-group mt-2">
      <label htmlFor={id}>{label}</label>
      <Field as="textarea" id={id} name={name} {...rest} />
      <div className="error">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}

function Select(props) {
  const {
    className,
    customIcon,
    displayTag = true,
    iconHide,
    id,
    isDisabled,
    isMulti,
    isSearchable = false,
    label,
    name,
    onChange,
    options,
    outerClass,
    placeholder,
    setFieldValue,
    value,
  } = props;

  const handleChange = (values) => {
    try {
      if (isMulti) {
        let tempArray = [];
        tempArray = values.map((item) => item.value);
        setFieldValue(name, tempArray);
        onChange(tempArray);
      } else {
        setFieldValue(name, values.value);
        onChange(values.value);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const selectedValue = () => {
    if (isMulti) {
      let tempArray = [];
      value?.map((outerItem) => {
        let tempObj = options?.find(
          (item) => item.value.toString() === outerItem.toString()
        );
        tempArray.push(tempObj);
        return null;
      });

      return tempArray;
    } else {
      return options?.find((item) => item.value === value);
    }
  };
  const optionProps = useMemo(() => options, [options]);
  return (
    <>
      <div className={`form-group ${outerClass}`}>
        {label && <label className="sign_title">{label}</label>}
        <ReactSelect
          closeMenuOnSelect={true}
          className={`${className}`}
          isDisabled={isDisabled}
          classNamePrefix="my-select"
          isSearchable={isSearchable}
          options={optionProps}
          placeholder={placeholder || ""}
          isClearable={false}
          value={selectedValue()}
          name={name}
          isMulti={isMulti}
          id={id || ""}
          onChange={(values) => {
            handleChange(values);
          }}
          styles={{
            menu: (base) => ({
              ...base,
            }),
            multiValue: (base) => ({
              ...base,
              marginRight: 6,
              color: "#FFFFFF",
              background: "#3DA496",
              borderRadius: "10px",
              display: displayTag ? "flex" : "none",
              paddingTop: 5,
              paddingBottom: 5,
              paddingLeft: 11,
              paddingRight: 6,
              fontFamily: "Mulish",
              fontStyle: "normal",
              fontSize: "14px",
            }),
            multiValueLabel: () => ({
              color: "#fff",
            }),
            multiValueRemove: () => ({
              background: "none",
              marginLeft: 10,
              marginRight: 2,
            }),
          }}
          components={{
            Option: CustomOption,
            DropdownIndicator: (props) => (
              <DropdownIndicator
                iconHide={iconHide}
                customIcon={customIcon}
                {...props}
              />
            ),
            MultiValueRemove,
          }}
        />
      </div>
      {/* <ErrorMessage
        component={({ children }) => <div className="error">{children}</div>}
        name={name}
      /> */}
    </>
  );
}

function RadioButtons(props) {
  const { label, name, options, ...rest } = props;
  return (
    <>
      <Field name={name}>
        {(formik) => {
          const { field } = formik;
          return options?.map((option) => {
            return (
              <div className="col-md-4" key={option.key}>
                <div className="form-group event-custom-radiobox">
                  <input
                    type="radio"
                    id={option.value || ""}
                    {...field}
                    {...rest}
                    value={option?.value}
                    checked={
                      field?.value?.toString() === option?.value?.toString()
                    }
                  />
                  <label htmlFor={option.value || ""}>{option.key}</label>
                </div>
              </div>
            );
          });
        }}
      </Field>

      {/* <ErrorMessage
        component={({ children }) => <div className="error">{children}</div>}
        name={name}
      /> */}
    </>
  );
}

function CheckBoxes(rest) {
  const { label, name, options, values, className, outerClass } = rest;
  return (
    <>
      <label>{label}</label>
      {options?.length > 1 ? (
        <FieldArray
          name={name}
          render={(arrayHelpers) =>
            options.map((tag) => (
              <div className={`form-group ${outerClass}`} key={tag.value}>
                <input
                  name={name}
                  id={tag.value}
                  type="checkbox"
                  className={`form-check-input ${className}`}
                  value={tag.value}
                  checked={[...values].includes(tag.value)}
                  disabled={tag.disabled || false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      arrayHelpers.push(tag.value);
                    } else {
                      const idx = [...values].indexOf(tag.value);
                      arrayHelpers.remove(idx);
                    }
                  }}
                />
                <label className="form-check-label" htmlFor={tag.value}>
                  {tag.key}
                </label>
              </div>
            ))
          }
        />
      ) : (
        <label className="ml_20" htmlFor={name}>
          <Field type="checkbox" id={name} name={name} class="checkbox_icon" />
          <span class="emergency_call_text">
            {options?.length && options[0].key}
          </span>
        </label>
      )}
      <ErrorMessage
        component={({ children }) => <div className="error">{children}</div>}
        name={name}
      />
    </>
  );
}

function SearchBox(rest) {
  const {
    label,
    objectKey,
    placeholder,
    showInput = true,
    showList = true,
    listType = "LIST",
    value,
    onValueChange,
    setFieldValue,
    name,
    options,
  } = rest;

  const [result, setResult] = useState([]);
  const [text, setText] = useState("");
  const [selectedUsers, setSelectedUser] = useState([]);

  const filterOptions = (e) => {
    try {
      e.preventDefault();
      let text = e?.target?.value;
      setText(text);
      let tempResult = options?.filter(
        (item) =>
          item[objectKey].toUpperCase().includes(text.toUpperCase()) === 1
      );
      setResult(tempResult);
    } catch (error) {
      console.error(error);
    }
  };

  const selectOption = (user) => {
    try {
      let userExist = value()?.filter((item) => item === user?.id);
      if (userExist?.length) {
        // dispatch(
        //   setMessage({
        //     text: "User already added",
        //     type: AlertEnum.Warning,
        //   })
        // );
      } else {
        setSelectedUser([...selectedUsers, user]);
        setFieldValue(name, [...value(), user?.id]);
        onValueChange([...selectedUsers, user]);
      }
      setResult([]);
      setText("");
    } catch (error) {
      console.error(error);
    }
  };
  const removeItem = (user) => {
    try {
      let tempValue = [...value()];
      let index = tempValue.indexOf(user?.id);
      tempValue.splice(index, 1);
      setFieldValue(name, tempValue);
      onValueChange([...tempValue]);
      setText("");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    let tempArr = [];

    value()?.map((user) =>
      options.filter((item) => {
        if (item?.id.toString() === user.toString()) {
          return tempArr.push(item);
        }
      })
    );
    setSelectedUser(tempArr);
    return () => {};
  }, [value]);
  return (
    <div className="form-group speakers-search-wrapper">
      {listType === "AVTAR" && showList ? (
        <div className="speakers-add row">
          <ul className="avtar_images">
            {selectedUsers.slice(0, 3).map((user) => (
              <li
                style={{
                  marginRight: "5px",
                  background: "none",
                  padding: 0,
                }}
                key={user?.id}
              >
                <img alt="myImg" src={user?.image || BackGround.Upload} />
              </li>
            ))}
            <span>
              {selectedUsers.length > 3 &&
                ` + ${selectedUsers.length - 3} More`}
            </span>
          </ul>
          {selectedUsers.length > 3 && (
            <a
              className="btn-view"
              data-bs-toggle="modal"
              href="#exampleModalToggle"
              role="button"
            >
              View All
            </a>
          )}
        </div>
      ) : (
        <></>
      )}
      <label>{label}</label>
      {showInput && (
        <input
          type="search"
          value={text}
          placeholder={placeholder}
          onChange={(e) => {
            filterOptions(e);
          }}
        />
      )}
      {listType === "LIST" && showList ? (
        <div className="speakers-add">
          <ul>
            {selectedUsers.map((user) => (
              <li key={user?.id}>
                <img alt="myImg" style={{ height: "40px" }} src={user?.image} />
                <div>
                  <h5>
                    {user?.first_name} {user?.last_name}
                  </h5>
                  <p>
                    {user?.current_job?.title} at{" "}
                    {user?.current_job?.company_name}
                  </p>
                </div>
                <a
                  href="#!"
                  className="close-speakers"
                  onClick={(e) => {
                    e.preventDefault();
                    removeItem(user);
                  }}
                >
                  <img alt="myImg" src={Icon.CancelBlack} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
      {result?.length ? (
        <div className="speakers-search-list">
          <ul>
            {result?.map((user) => (
              <li
                key={user?.id}
                onClick={(e) => {
                  e.preventDefault();
                  selectOption(user);
                }}
              >
                <img alt="myImg" src={user?.image} />
                <h5>
                  {user?.first_name} {user?.last_name}
                </h5>
                <p>
                  {user?.current_job?.title} at{" "}
                  {user?.current_job?.company_name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}

      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="post-title">
              <h6>Selected {label}</h6>
            </div>

            <button
              type="button"
              className="cancle-post-modal"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              +
            </button>

            <div className="modal-body">
              <div className="speakers-add">
                <ul>
                  {selectedUsers.map((user) => (
                    <li key={user?.id}>
                      <img
                        alt="myImg"
                        style={{ height: "40px" }}
                        src={user?.image}
                      />
                      <div>
                        <h5>
                          {user?.first_name} {user?.last_name}
                        </h5>
                        <p>
                          {user?.current_job?.title} at{" "}
                          {user?.current_job?.company_name}
                        </p>
                      </div>
                      <a
                        href="#!"
                        className="close-speakers"
                        onClick={(e) => {
                          e.preventDefault();
                          removeItem(user);
                        }}
                      >
                        <img alt="myImg" src={Icon.CancelBlack} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { Input, TextArea, Select, RadioButtons, CheckBoxes, SearchBox };
