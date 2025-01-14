import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, InputNumber, DatePicker, Modal } from 'antd';
import { STATUSES } from '../../const';
import { UNIT_OPTIONS } from '../../const';
import {
  getServiceProviders,
  addServiceAction,
} from '../../state/actions/serviceActions';

const { TextArea } = Input;

function AddServiceForm({
  visible,
  onCreate,
  onCancel,
  serviceProviders,
  recipients,
  serviceTypes,
}) {
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        visible={visible}
        title="Log New Service"
        okText="Log Service"
        cancelText="Cancel"
        width="80%"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              console.log('values', values);
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed', info);
            });
        }}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            modifier: 'public',
          }}
        >
          <div className="date-time-wrapper">
            <Form.Item
              label="Date & Time of Service"
              name="provided_at"
              rules={[
                {
                  required: true,
                  message: 'Enter Date',
                },
              ]}
            >
              <DatePicker
                showTime
                use12Hours
                format="MMMM Do YYYY, h:mm a"
                size="large"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Service Type"
            name="service_type_id"
            rules={[
              {
                required: true,
                message: 'Please select the Service Type',
              },
            ]}
          >
            <Select size="large" placeholder="Select Service Type">
              {serviceTypes.map(item => (
                <Select.Option
                  key={item.service_type_id}
                  value={item.service_type_id}
                >
                  {item.service_type_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Service Status"
            name="status_id"
            rules={[
              {
                required: true,
                message: 'Please select the program',
              },
            ]}
          >
            <Select placeholder="Select Status" size="large">
              {STATUSES.map(item => (
                <Select.Option key={item.id} value={item.id}>
                  {' '}
                  {item.type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Service Provider"
            name="provider_id"
            rules={[
              {
                required: true,
                message: 'Please select the provider',
              },
            ]}
          >
            <Select placeholder="Select Provider" size="large">
              {serviceProviders.map(provider => (
                <Select.Option
                  key={provider.provider_id}
                  value={provider.provider_id}
                >
                  {provider.provider_first_name +
                    ' ' +
                    provider.provider_last_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Case Notes" name="notes">
            <TextArea
              placeholder="Enter Details..."
              showCount
              maxLength={240}
            />
          </Form.Item>
          <Form.Item
            label="Unit (Class, Tickets, etc)"
            name="unit"
            rules={[
              {
                required: true,
                message: 'Please select the unit',
              },
            ]}
          >
            <Select size="large" placeholder="Select Unit Type">
              {UNIT_OPTIONS.map(item => (
                <Select.Option key={item.id} value={item.unit_type}>
                  {item.unit_type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Quantity Of Units" name="quantity">
            <InputNumber type="number" size="large" min="0" />
          </Form.Item>
          <Form.Item label="Value of Services In Dollars" name="value">
            <InputNumber type="number" size="large" min="0" />
          </Form.Item>

          <Form.Item
            label="Recipient Name"
            name="recipient_id"
            rules={[
              {
                required: true,
                message: 'Please select the Recipient',
              },
            ]}
          >
            <Select size="large" placeholder="Select Recipient">
              {recipients.map(recipient => (
                <Select.Option
                  key={recipient.recipient_id}
                  value={recipient.recipient_id}
                >
                  {recipient.recipient_first_name +
                    ' ' +
                    recipient.recipient_last_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Service Address (not permanent address)"
            name="address"
            rules={[
              {
                required: true,
                message: 'Please enter the address',
              },
            ]}
          >
            <Input placeholder="Enter Street Address" size="large" />
          </Form.Item>
          <Form.Item
            label="Service City"
            name="city"
            rules={[
              {
                required: true,
                message: 'Please enter the city',
              },
            ]}
          >
            <Input placeholder="Enter City" size="large" />
          </Form.Item>
          <Form.Item
            label="Service State"
            name="state"
            rules={[
              {
                required: true,
                message: 'Please enter the state',
              },
            ]}
          >
            <Input placeholder="Enter State" size="large" />
          </Form.Item>
          <Form.Item
            label="Service Zip Code"
            name="zip_code"
            rules={[
              {
                required: true,
                message: 'Please enter the zip code',
              },
            ]}
          >
            <Input placeholder="Enter Zip Code" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
const mapStateToProps = state => {
  return {
    serviceProviders: state.service.serviceProviders,
    recipients: state.recipient.recipients,
    serviceTypes: state.serviceType.serviceTypes,
  };
};
export default connect(mapStateToProps, {
  addServiceAction,
  getServiceProviders,
})(AddServiceForm);
