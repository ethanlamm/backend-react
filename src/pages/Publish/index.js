import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import {addArticle } from '@/api/article'
const { Option } = Select

const Publish = () => {
    const [params] = useSearchParams()
    const id = params.get('id')
    
    // 频道数据
    const { channelStore } = useStore()

    // 默认单图
    const [imgCount, setImgCount] = useState(1)
    // 图片列表
    const [fileList, setFileList] = useState([])
    // 切换 单图 | 三图 | 无图
    const radioChange = (e) => {
        // 切换清空上次上传的图片
        setFileList([])
        setImgCount(e.target.value)
    }
    // 上传图片
    const uploadHandler = ({ file, fileList }) => {
        // 上传前的验证：上传类型、图片大小(1M)
        // 上传类型
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            return message.warn('只能上传JPG或PNG类型的图片！')

        }
        // 限制1M大小
        const isLt1M = file.size / 1024 / 1024 < 1
        if (!isLt1M) {
            return message.warn('图片大小不得大于1M！');
        }
        // 条件符合，上传文件
        setFileList(fileList)
    }

    // 表单提交
    const onSubmit = async (formData) => {
        const { content } = formData
        if (content === '<p><br></p>') {
            return message.warn('请输入文章内容！')
        }
        // 整理参数
        let images = fileList.map(item => {
            if (item.status === 'done') {
                return item.response.data.url
            }
        })
        images = images.filter(url => url)
        const reqParams = {
            ...formData,
            cover: {
                type: formData.type,
                images
            }
        }
        try {
            // 请求接口
            await addArticle(reqParams)
            message.success('发布文章成功')
            // 清空表格数据
            // ...
        } catch (e) {
            message.error(e.response?.data?.message || '发布文章失败')
            // 清空表格数据
            // ...
        }

    }



    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{id?'编辑':'发布'}文章</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1, content: null }}
                    onFinish={onSubmit}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {
                                channelStore?.channelList?.map(
                                    c => <Option value={c.id} key={c.id}>{c.name}</Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={radioChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imgCount > 0 && (
                            <Upload
                                name="image"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList
                                action="http://geek.itheima.net/v1_0/upload"
                                fileList={fileList}
                                maxCount={imgCount}
                                multiple={imgCount>1}
                                onChange={uploadHandler}
                            >
                                <div style={{ marginTop: 8 }}>
                                    <PlusOutlined />
                                </div>
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                {id ? '更新' : '发布'}文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default observer(Publish)