import Head from 'next/head'
import React, { ReactNode, useState } from 'react'
import Navbar from './navbar'
import { useTranslation } from 'react-i18next'


interface Props {
    children?: ReactNode;
    clicked?: boolean;
}

const Layout = ({ children }: Props) => {

    const { t, i18n } = useTranslation();

    return (
        <div>
            <Head>
                <title>{t("about15")}</title>
                <link rel="icon" href="/icon.png" />
            </Head>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout