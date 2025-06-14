'use client';

import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import { Typography } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
import { Card, Space } from 'antd';
import { List } from 'antd';

export default function AboutPage() {
    return (
        <Layout>
            <Content style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
                <Title level={1}>About Relax-App</Title>

                <Card
                    style={{
                        background: 'rgba(14, 74, 64, 0.5)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: 12,
                    }}
                >
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Title level={4}>Our Mission</Title>
                        <Paragraph style={{ color: 'rgba(255,255,255,0.85)' }}>
                            Relax‑App is a collection of atmospheric videos with subtle music, created for those who love to relax, work, or
                            read with a pleasant visual background. We manually curate the most harmonious ambient videos from YouTube and
                            gather them in one place, so you don&apos;t have to spend time searching.
                        </Paragraph>
                    </Space>

                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Title level={4}>What You&apos;ll Find on the Site</Title>
                        <List
                            size="small"
                            dataSource={[
                                'Video playlists — peaceful landscapes, rainy cafes, fireplace scenes, and other thematic content',
                                'Channel catalog — a list of YouTube creators who regularly publish similar content',
                                'Minimal distractions — a clean interface without excessive advertising, so nothing interferes' +
                                    ' with your relaxation or focus',
                            ]}
                            renderItem={(item) => <List.Item style={{ color: 'rgba(255,255,255,0.85)' }}>{item}</List.Item>}
                        />
                    </Space>

                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Title level={4}>Development Status</Title>
                        <Paragraph style={{ color: 'rgba(255,255,255,0.85)' }}>
                            Relax‑App is under active development. We continuously improve functionality, add new videos, and experiment
                            with design. There might be minor issues or temporary absence of some features — please bear with us.
                        </Paragraph>
                    </Space>

                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Title level={4}>How to Help the Project</Title>
                        <Paragraph style={{ color: 'rgba(255,255,255,0.85)' }}>
                            Do you have an idea to make Relax‑App better? Want to suggest a favorite channel or video? Write to us!
                            We&apos;re happy to consider any suggestions:
                        </Paragraph>
                        <List
                            size="small"
                            dataSource={[
                                {
                                    platform: 'Telegram',
                                    handle: '@yamkin_alex',
                                    href: 'https://t.me/yamkin_alex',
                                },
                            ]}
                            renderItem={(item) => (
                                <List.Item style={{ padding: 0, lineHeight: 1.5 }}>
                                    <Text style={{ color: 'rgba(255,255,255,0.85)' }}>
                                        {item.platform}:{' '}
                                        <Link href={item.href} target="_blank" rel="noopener noreferrer">
                                            {item.handle}
                                        </Link>
                                    </Text>
                                </List.Item>
                            )}
                        />
                    </Space>

                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Title level={4}>Acknowledgments</Title>
                        <Paragraph style={{ color: 'rgba(255,255,255,0.85)' }}>
                            Thank you to all ambient video creators for inspiration, and to you — for using Relax‑App. Your feedback helps
                            us grow and develop.
                        </Paragraph>
                        <Paragraph style={{ color: 'rgba(255,255,255,0.85)' }}>Enjoy your relaxation and productive work!</Paragraph>
                    </Space>
                </Card>
            </Content>
        </Layout>
    );
}
