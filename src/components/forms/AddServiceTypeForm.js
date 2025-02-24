import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Modal, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import CC_NumberInput from './CustomizableComponents/CC_NumberInput';
import { getAllCategoriesAction } from '../../state/actions';
function AddServiceTypeForm({
  onCreate,
  onCancel,
  visible,
  programs,
  categories,
  change,
  getAllCategoriesAction,
}) {
  const [form] = Form.useForm();

  //state for which dropdown Value is selected
  const [dropDownValue, setDropDownValue] = useState('');

  const handleSelectCustomField = ({ key }) => {
    setDropDownValue(key);
  };

  //this needs to be connected to an endpoint which has not yet been built to fetch all of the categories
  useEffect(() => {
    getAllCategoriesAction();
  }, [change, getAllCategoriesAction]);

  const menu = (
    <Menu onClick={handleSelectCustomField}>
      <Menu.Item key="Number" value="Number">
        <a>Number</a>
      </Menu.Item>
      <Menu.Item key="Text">
        <a>Text</a>
      </Menu.Item>
      <Menu.Item key="Dropdown">
        <a>Dropdown</a>
      </Menu.Item>
      <Menu.Item key="Checkboxes">
        <a>Checkboxes</a>
      </Menu.Item>
      <Menu.Item key="RadioButtons">
        <a>Radio Buttons</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Modal
        visible={visible}
        title="Add Service Type"
        okText="Add Service Type"
        cancelText="Cancel"
        width="80%"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="add_program_form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item
            name="name"
            label="Service Name"
            rules={[
              {
                // required: true,
                message: 'Please input the service name',
              },
            ]}
          >
            <Input size="large" placeholder="Enter Name" />
          </Form.Item>
          <Form.Item
            name="program_id"
            label="Program"
            rules={[
              {
                required: true,
                message: 'Please input the program type',
              },
            ]}
          >
            <Select size="large" placeholder="Select Program">
              {programs.map(item => (
                <Select.Option key={item.id} value={item.id}>
                  {item.program_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="category_id"
            label="Category"
            rules={[
              {
                required: true,
                message: 'Please input the category type',
              },
            ]}
          >
            <Select size="large" placeholder="Select Category">
              {programs.map((
                // switch to categories once connected to backend.
                item
              ) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.category_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Service Description" name="description">
            <Input.TextArea
              placeholder="Enter Details..."
              showCount
              maxLength={240}
            />
          </Form.Item>
          {/* <button onClick={}>Add a custom Service Field</button> */}
          <Dropdown name="dropdown_custom" overlay={menu} trigger={['click']}>
            <a
              className="custom_dropdown_selector"
              onClick={e => e.preventDefault()}
            >
              Add A Custom Service Field <DownOutlined />
            </a>
          </Dropdown>

          {dropDownValue === 'Number' ? <CC_NumberInput /> : <></>}
          {/* // Add these in and build this out in the forms>CustomizableComponents folder */}
          {/* {dropDownValue === 'Text' ? (
            <CC_TextInput />
          ) : <></>}
          {dropDownValue === 'Dropdown' ? (
            <CC_DropdownInput />
          ) : <></>}
          {dropDownValue === 'Checkboxes' ? (
            <CC_CheckboxesInput />
          ) : <></>}
          {dropDownValue === 'RadioButton' ? (
            <CC_RadioButtonInput />
          ) : <></>} */}
        </Form>
      </Modal>
    </>
  );
}
const mapStateToProps = state => {
  return {
    serviceProviders: state.service.serviceProviders,
    recipients: state.recipient.recipients,
    serviceTypes: state.service.serviceTypes,
    programs: state.program.programs,
    // categories: state.categories, //add categories and change back in once endpoint is ready. Might need to switch to state.category.categories depending on endpoint
    // change: state.change
  };
};
export default connect(mapStateToProps, { getAllCategoriesAction })(
  AddServiceTypeForm
);
