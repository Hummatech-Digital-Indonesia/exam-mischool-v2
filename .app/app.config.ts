/**
 * This file is used to configure the app
 *
 * If you have the "Cannot find name 'defineAppConfig'.ts(2304)" error
 * update the root tsconfig.json file to include the following:
 *
 *  "extends": "./.demo/.nuxt/tsconfig.json"
 *
 */

export default defineAppConfig({
  nuxtIcon: {},
  // nui: {
  //   defaultShapes: {},
  // },
  tairo: {
    topnav: {
      navigation: {
        enabled: true,
        logo: {
          component: 'TairoLogo',
          props: { class: 'text-primary-600 w-24' },
        },
        header: {
          
        },
        items: [
          {
            name: 'Dashboard',
            icon: { name: 'ph:gauge-duotone', class: 'w-6 h-6' },
            activePath: '/dashboard',
            to: '/dashboard',
          },
          {
            name: 'Ujian',
            icon: { name: 'ph:suitcase-duotone', class: 'w-6 h-6' },
            activePath: '/ujian',
            to: '/ujian',
          },
          {
            name: 'Ulangan',
            icon: { name: 'ph:users-duotone', class: 'w-6 h-6' },
            activePath: '/ulangan',
            to: '/ulangan',
          },
        ],
      },
      circularMenu: {
        enabled: true,
        tools: [
          {
            component: 'DemoThemeToggle',
            props: {
              class: 'ms-auto',
              disableTransitions: true,
              inverted: true,
            },
          },
        ],
      },
      toolbar: {
        enabled: true,
        showTitle: false,
        tools: [
          {
            component: 'DemoThemeToggle',
            props: {
              disableTransitions: true,
            },
          },
          {
            component: 'DemoAccountMenu',
            props: {
              horizontal: true,
            },
          },
        ],
      },
      footer: {
        enabled: true,
        logoSeparator: {
          component: 'TairoLogo',
          props: { class: 'text-primary-500 h-7 w-7' },
        },
        logo: {
          component: 'TairoLogoText',
          props: {
            class:
              'text-muted-300 ltablet:mx-0 mx-auto h-4 transition-all duration-200 lg:mx-0',
          },
        },
        copyright: {
          name: 'Css Ninja',
          to: 'https://cssninja.io',
          since: '2018',
        },
        links: [
          {
            name: 'Demo pages',
            to: '/demo',
          },
          {
            name: 'Documentation',
            to: '/documentation',
          },
          {
            name: 'Shuriken UI',
            to: 'https://github.com/shuriken-ui',
            rel: 'noopener',
            target: '_blank',
          },
          {
            name: 'Support',
            to: 'https://cssninja.io/faq/support',
            rel: 'noopener',
            target: '_blank',
          },
        ],
      },
    },
    panels: [
      {
        name: 'language',
        position: 'right',
        component: 'DemoPanelLanguage',
      },
      {
        name: 'activity',
        position: 'right',
        component: 'DemoPanelActivity',
      },
      {
        name: 'search',
        position: 'left',
        component: 'DemoPanelSearch',
      },
      {
        name: 'task',
        position: 'right',
        component: 'DemoPanelTask',
      },
    ],
    error: {
      logo: {
        component: 'img',
        props: {
          src: '/img/illustrations/system/404-1.svg',
          class: 'relative z-20 w-full max-w-lg mx-auto',
        },
      },
    },
  },
})
