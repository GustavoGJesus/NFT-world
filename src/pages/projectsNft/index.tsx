import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client'
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss'

export default function projectsNft(){
    return(
        <>
            <Head>
                <title>NFT Projects | NFT World</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.projects}>
                    <a href="#">
                        <time>13 de novembro 2021</time>
                        <strong> Create new post </strong>
                        <p>Paragraph</p>
                    </a>
                    <a href="">
                        <time>13 de novembro 2021</time>
                        <strong> Create new post </strong>
                        <p>Paragraph</p>
                    </a>
                    <a href="">
                        <time>13 de novembro 2021</time>
                        <strong> Create new post </strong>
                        <p>Paragraph</p>
                    </a>
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'NFT-Project')
    ], {
        fetch:['NFT-Project.title', 'NFT-Project.content'],
        pageSize: 100,
    })

    console.log(JSON.stringify(response, null, 2));

    return{
        props: {}
    }
}
