import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Prismic from '@prismicio/client';

//Conersor de texto
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}
interface PostsProps {
    posts: Post[],
}

export default function projectsNft( {posts}: PostsProps){

    return(
        <>
            <Head>
                <title>Projects | NFT world</title>
            </Head>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map (post => (
                        <Link href={`/projectsNft/${post.slug}`}>
                            <a key={post.slug}>
                                <time>{post.updatedAt}</time>
                                <strong>{post.title}</strong>
                                <p>{post.excerpt}</p>
                            </a>
                        </Link>
                        
                        ))}
                </div>
                </main>
            </ motion.div>
        </>
    )
}

//Consumindo API do Prismic 
export const getStaticProps: GetStaticProps = async () => {
    const prismic =  getPrismicClient();

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'post')
    ], {
        fetch: ['post.title', 'post.content'],
        pageSize: 100,
    }
    )

    const posts = response.results.map(post => {
        return{
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('en-us', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })
    return{ 
        props: {
            posts
        }
    }
}