import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "بله کمپ",
  tagline: "بزن بریم!",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://bootcamp.bale.ai",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "fa",
    locales: ["fa"],
    localeConfigs: {
      fa: {
        direction: "rtl",
        htmlLang: "fa-IR",
      },
    },
  },
  plugins: [
    [
      "docusaurus-plugin-dotenv",
      {
        systemvars: true,
      },
    ],
  ],
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      // title: "بله کمپ",
      logo: {
        alt: "لوگو",
        src: "img/bale_camp.png",
      },
      items: [
        // {
        //   type: "docSidebar",
        //   sidebarId: "tutorialSidebar",
        //   position: "left",
        //   label: "Tutorial",
        // },
        // {
        //   to: "/docs/intro",
        //   label: "مقدمات",
        //   position: "left",
        //   sidebarId: "tutorialSidebar",
        // },
        {
          to: "/docs/frontend",
          label: "فرانت‌اند",
          position: "left",
          // docId: "frontend",
        },
        // { to: "/docs/backend", label: "‌بک‌اند", position: "left" },
        // { to: "/docs/android", label: "اندروید", position: "left" },
        // { to: "/docs/devops", label: "دواپس", position: "left" },
        // {
        //   href: "https://github.com/facebook/docusaurus",
        //   label: "GitHub",
        //   position: "right",
        // },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "مستندات",
          items: [
            // {
            //   label: "مقدمات",
            //   to: "/docs/intro",
            // },
            {
              label: "فرانت‌اند",
              to: "/docs/frontend",
            },
            // {
            //   label: "بک‌اند",
            //   to: "/docs/backend",
            // },
            // {
            //   label: "اندروید",
            //   to: "/docs/android",
            // },
            // {
            //   label: "دواپس",
            //   to: "/docs/devops",
            // },
          ],
        },
        // {
        //   title: "گیت‌هاب",
        //   items: [
        //     {
        //       label: "Stack Overflow",
        //       href: "https://stackoverflow.com/questions/tagged/docusaurus",
        //     },
        //     {
        //       label: "Discord",
        //       href: "https://discordapp.com/invite/docusaurus",
        //     },
        //     {
        //       label: "Twitter",
        //       href: "https://twitter.com/docusaurus",
        //     },
        //   ],
        // },
        {
          title: "بیشتر",
          items: [
            {
              label: "گیتلب",
              href: "https://gitlab.com/bale.ai/internship/bootcamp",
            },
          ],
        },
      ],
      copyright: `تمامی حقوق مادی و معنوی این سایت متعلق به پیام‌رسان بله می‌باشد.
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
