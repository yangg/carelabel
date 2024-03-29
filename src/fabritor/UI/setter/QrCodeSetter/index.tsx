import { fabric } from 'fabric';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Flex, Form, Input, InputNumber, QRCode, Row } from 'antd';
import { GloablStateContext } from '@/context';
import { createImage } from "@/editor/objects/image";

const { Item: FormItem } = Form;

export default function QrCodeSetter () {
  const { object, editor } = useContext(GloablStateContext);
  const [form] = Form.useForm();
  const qrRef = useRef<HTMLDivElement>(null);
  const qrValue = Form.useWatch('qrInfo', form)

  const handleImageReplace = (base64) => {
    if (base64) {
      (object as fabric.Image).setSrc(base64, () => {
        editor.canvas.requestRenderAll();
      });
    }
  }


  const handleValuesChange = (values) => {
    object.set('qrInfo', {
      ...object.qrInfo,
      ...values.qrInfo,
    })
    setTimeout(() => {
      if(qrRef.current) {
        const canvasEl = qrRef.current.querySelector('canvas');
        if (canvasEl) {
          handleImageReplace(canvasEl.toDataURL());
        }
      }
      editor.fireCustomModifiedEvent();
    }, 50)
  }

  useEffect(() => {
    if (object) {
      form.setFieldsValue({
        qrInfo: object.qrInfo,
      });
    }
  }, [object]);

  return (
    <>
      <Form
        form={form}
        onValuesChange={handleValuesChange}
        colon={false}
      >
        <FormItem
            name={['qrInfo', 'value']}
            label="文本"
        >
          <Input />
        </FormItem>
        <FormItem
            name={['qrInfo', 'size']}
            label="大小"
        >
          <InputNumber min={50} />
        </FormItem>
        {
            qrValue?.value && <Flex vertical align="center" gap={10} style={{ marginTop: 16 }} ref={qrRef}>
            <QRCode
              type="canvas"
              {...qrValue}
            />
          </Flex>
        }
      </Form>
    </>
  )
}
