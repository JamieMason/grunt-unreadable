# grunt-unreadable

> Grunt plugin for Unreadable: an intelligent/CSS-aware HTML Minifier and Optimizer

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-unreadable --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-unreadable');
```

## The "unreadable" task

### Overview
In your project's Gruntfile, add a section named `unreadable` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  unreadable: {
    your_target: {
      expand: true, // enable dynamic expansion.
      cwd: 'optional/path/to/html/directory/relative/to/GruntFile',
      src: ['**/*.html'], // actual pattern(s) to match.
      dest: 'destination/directory/to/output/minified/html/to',
      ext: '.min.html' // optionally change extension
    }
  }
});
```

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  unreadable: {
    views: {
      expand: true,
      cwd: 'views/',
      src: ['**/*.html'],
      dest: 'production/views'
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
