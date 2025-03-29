import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Sam学习笔记',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://S7245.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/SamLauGeek/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'samlau7245@gmail.com', // Usually your GitHub org/user name.
  projectName: 'SamLauGeek', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/S7245/SamLauGeek/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/S7245/SamLauGeek/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Sam学习笔记',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: "Flutter项目",
          type: "dropdown",
          items: [
            {
              type: "docSidebar",
              label: "Flutter基础",
              sidebarId: "flutterBasicSidebar",
            },
            {
              type: "docSidebar",
              label: "MuSicApp",
              sidebarId: "flutterPrjMusicAppSidebar",
            },
            {
              type: "docSidebar",
              label: "FlutterWidgets",
              sidebarId: "flutterWidgetsSidebar",
            },
          ],
        },
        {
          label: "Dart",
          type: "dropdown",
          items: [
            {
              type: "docSidebar",
              label: "Dart基础",
              sidebarId: "dartBasicSidebar",
            },
          ],
        },
        {
          label: "Expo项目",
          type: "dropdown",
          items: [
            {
              type: "docSidebar",
              label: "ExpoBasic",
              sidebarId: "expoBasicSidebar",
            }
          ],
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/S7245/SamLauGeek',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
