import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space, Popconfirm,message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
// 中文
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
// error图
import img404 from '@/assets/error.png'

import './index.scss'
import { useEffect, useState } from 'react'
import { getArticles, deleteArticle } from '@/api/article'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    // 频道数据(修改为：在Layout组件挂载时请求数据，存储于Mobx中，然后再从中取数据)
   const {channelStore} =useStore()

    // 点击筛选按钮，筛选条件改变
    const onFinish = (formData) => {
        const { status, channel_id, date } = formData
        console.log(formData);
        // 整理参数
        const _params = {}
        if (status!=='') {
            // status 不选择，默认为空字符串，若不选择，则不需要写入请求参数中，代表 全部
            _params.status = status
        }
        if (channel_id!==undefined) {
            // channel_id 不选择，默认为undefined，若不选择，则不需要写入请求参数中，代表 全部
            _params.channel_id = channel_id
        }
        if (date) {
            // date 不选择，默认为undefined，若不选择，则不需要写入请求参数中，代表 全部
            _params.begin_pubdate = date[0].format('YYYY-MM-DD')
            _params.end_pubdate = date[1].format('YYYY-MM-DD')
        }

        // 修改请求参数
        setReqParams({
            page: 1,
            per_page: 10,
            ..._params
        })
    }

    // 筛选结果所用数据
    // 对应关系：
    // colums是一个数组，数组中的每个元素是一个对象，每个对象代表每一列
    // 对象属性：{ title:该列的标题，dataIndex:一行中对应的key数据，render:(key数据)=>{}}

    // dataSource是一个数组，数组中的每个元素是一个对象，每个对象代表每一行
    // 对象属性：{ key1:对应的数据，key2:对应的数据，...}

    // 删除文章
    const confirm = async (id) => {
        await deleteArticle(id)
        message.success('删除成功')
        // 重新请求数据渲染
        setReqParams({
            page: 1,
            per_page:10
        })
    }

    const navigate=useNavigate()
    // 点击编辑跳转
    const goToPublish = (data) => {
        navigate(`/publish?id=${data.id}`)
    }
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => <Tag color="green">审核通过</Tag>
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />}
                            onClick={ ()=>goToPublish(data)} />
                        <Popconfirm
                            title="确认删除该文章吗？"
                            onConfirm={() => confirm(data.id)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    // 文章数据
    const [article, setArticle] = useState({
        list: [],
        total_count: 0
    })
    // 请求参数
    const [reqParams, setReqParams] = useState({
        page: 1,
        per_page: 3
    })
    // 获取文章数据方法
    const getArticleList = async () => {
        const { data } = await getArticles(reqParams)
        const { results, total_count } = data
        // 赋值
        setArticle({
            list: results,
            total_count
        })
    }
    // 挂载时、请求参数变化时，请求数据
    useEffect(() => {
        getArticleList()
    }, [reqParams])

    // 页数改变
    const pageChange = ({current}) => {
        setReqParams({
            ...reqParams,
            page: current
      })
    }
   

    return (
        <div className='article-container'>
            {/* 筛选区域 */}
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
                style={{ marginBottom: 20 }}
            >
                <Form
                    onFinish={onFinish}
                    initialValues={{ status: '' }}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{ width: 289 }}
                        >
                            {
                                channelStore?.channelList?.map(
                                    c => <Option value={c.id} key={c.id}>{c.name}</Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/* 筛选结果区域 */}
            <Card title={`根据筛选条件共查询到 ${article.total_count} 条结果：`}>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={article.list}
                    pagination={{
                        current: reqParams.page,
                        pageSize: reqParams.per_page,
                        total: article.total_count
                    }}
                    onChange={pageChange}
                />
            </Card>
        </div>
    )
}

export default observer(Article)