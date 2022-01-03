import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

import styles from './projectsNft.module.scss'

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
        image: string;
    }
}

export default function Post({post}: PostProps){
    return(
        <>
            <Head>
                <title>{post.title} | NFT world</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time> 
                    <div 
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{__html: post.content}}
                    />
                   <img src={post.image} alt="image" />
                </article>
            </main>
        </>
    )
}

export const getServerSideProps : GetServerSideProps = async ({req, params}) => {
    const {slug} = params;

    const prismic = getPrismicClient(req)

    const response = await prismic.getByUID('post', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-us', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }),
        image: {
            url: 'https://www.google.com.br/url?sa=i&url=https%3A%2F%2Fwww.oficinadanet.com.br%2Fgames%2F39038-bomb-crypto-entenda-como-funciona-nft&psig=AOvVaw23Cbw2-AjN3sZ8G0tot9RB&ust=1641029824053000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPi97NDejfUCFQAAAAAdAAAAABAD'
        }
          
    }

    return{ 
        props: {
            post,
        } 
    }
}