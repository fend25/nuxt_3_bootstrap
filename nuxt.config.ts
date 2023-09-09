// https://nuxt.com/docs/api/configuration/nuxt-config

const parseIntegerEnvVar = (envVar: string | undefined) => {
  const value = parseInt(envVar || '', 10)
  return isNaN(value) ? undefined : value
}

export default defineNuxtConfig({
  devtools: {enabled: true},
  css: ['~/assets/css/main.scss'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  modules: [
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {verbose: true, logger: {warn}},
        sass: {verbose: true, logger: {warn}},
      },
    },
  },
})

function warn(message: string, options: any) {
  const {stderr} = process
  const span = options.span ?? undefined
  const stack = (options.stack === 'null' ? undefined : options.stack) ?? undefined

  if (options.deprecation) {
    if (
      message.startsWith('Using / for division outside of calc() is deprecated') ||
      message.startsWith('Passing percentage units to the global abs() function is deprecated')
    ) {
      // silences above deprecation warning
      return
    }
    stderr.write('DEPRECATION ')
  }
  stderr.write(`WARNING: ${message}\n`)

  if (span !== undefined) {
    // output the snippet that is causing this warning
    stderr.write(`\n"${span.text}"\n`)
  }

  if (stack !== undefined) {
    // indent each line of the stack
    stderr.write(`    ${stack.toString().trimEnd().replace(/\n/gm, '\n    ')}\n`)
  }

  stderr.write('\n')
}
