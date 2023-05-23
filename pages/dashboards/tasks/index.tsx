import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Dashboards/Tasks/PageHeader';
import Footer from '@/components/Footer';
import VideoCards from '@/content/Dashboards/VideoCards';
import PageTitleWrapper from '@/components/PageTitleWrapper';

function DashboardTasks() {

  return (
    <>
      <Head>
        <title>YTCustomiser - Stats</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <VideoCards />
      <Footer />
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
