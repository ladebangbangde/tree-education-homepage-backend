import { App, ConfigProvider, theme } from 'antd';
import { ReactNode } from 'react';

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#2f5eea',
          borderRadius: 10,
          colorBgLayout: '#f3f5f9'
        }
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
