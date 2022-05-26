import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

/*
 *  大量にデータがある場合、すべてのコンテンツを生成できない。
 *  その場合fallback:trueもしくはblockingに設定することで段階的にページを生成できる。
 *
 *  trueの場合。ページが存在しないURLへアクセスきたら、fallbackページを表示する。コンテンツが整い次第、CSRする。
 *  blockingの場合。ページが存在しないURLへアクセスきたら、コンテンツが整うまで待ってSSRする。
 */
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}