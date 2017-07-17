# `dmdr cli`


### `dmdr iconfont create`

    create an iconfont

      Options:

        -h, --help                         output usage information
        -r, --root <currentWorkDirectory>  root of your project.
        -f, --fontname <fontname>          name of the iconfont
        -p, --prefix <prefix>              prefix for the iconfont
        -s, --source <sourceDirectory>     source folder of SVG files for the iconfont

## Directory Structure

    /src
      /icons
        /*.svg    <- place your desired icons here
      /{myIconFont}
        {myIconFont}.css
        {myIconFont}.html
        {myIconFont}.eot
        {myIconFont}.svg
        {myIconFont}.ttf
        {myIconFont}.woff
        {myIconFont}.woff2

### External Resources

* [An article about cli tools in node.js](https://developer.atlassian.com/blog/2015/11/scripting-with-node/)
* [Source Code related to above article](https://bitbucket.org/tpettersen/bitbucket-snippet/)

### Libraries

* [Chalk](https://github.com/chalk/chalk) - Terminal string styling done right
* [Commander.js](https://github.com/tj/commander.js) - node.js command-line interfaces made easy
* [Glob](https://github.com/tj/commander.js) - node.js command-line interfaces made easy
* [Webfonts-Generator](https://github.com/sunflowerdeath/webfonts-generator) - Generator of webfonts from svg icons