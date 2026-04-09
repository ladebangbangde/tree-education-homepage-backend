import { Card, Col, List, Row, Space, Statistic, Tag, Typography } from 'antd';
import PageHeader from '@/components/common/PageHeader';
import { useAuthStore } from '@/stores/authStore';

const quickEntries = ['用户管理', '角色管理', 'CMS文章', '线索跟进'];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.userInfo);

  return (
    <>
      <PageHeader title="工作台" subtitle="欢迎回到留学教育机构官网后台管理系统" />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card className="admin-content-card">
            <Typography.Title level={5}>欢迎卡片</Typography.Title>
            <Space wrap>
              <Tag color="blue">当前用户：{user?.displayName ?? '管理员'}</Tag>
              <Tag color="geekblue">权限数：{user?.permissions?.length ?? 0}</Tag>
            </Space>
          </Card>
        </Col>
        {[
          ['今日线索', 26],
          ['本周报名', 14],
          ['已发布文章', 63],
          ['待处理工单', 8]
        ].map(([title, value]) => (
          <Col xs={24} md={12} xl={6} key={title}>
            <Card className="admin-content-card">
              <Statistic title={title} value={value as number} />
            </Card>
          </Col>
        ))}
        <Col xs={24} xl={12}>
          <Card title="快捷入口" className="admin-content-card">
            <Space wrap>{quickEntries.map((item) => <Tag key={item}>{item}</Tag>)}</Space>
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card title="最近操作 / 系统提示" className="admin-content-card">
            <List
              dataSource={['系统配置更新已生效', '新增菜单权限待审核', '昨日登录成功率 99.8%']}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
