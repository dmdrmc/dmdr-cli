#!/usr/bin/env node

const path              = require('path');
const program           = require('commander');
const util              = require('util');
const fs                = require('fs');
const chalk             = require('chalk');
const Glob              = require('glob').Glob;
const webfontsGenerator = require('webfonts-generator')
const Handlebars        = require('handlebars')

Handlebars.registerHelper('strip_hashtag', (src) => {
  let res = src.replace(/(\?[a-z0-9\#]*)/g ,"");
  return new Handlebars.SafeString(res);
});

const getOptions = (dest,options,icons) => {
  let fontName = options.fontname;
  console.log("dest:"+dest)
  console.log("dest:"+options.destination)
  dest = path.join(dest,options.destination,fontName);
  console.log("prefix:"+options.prefix)
  return {
    html:  true,
    htmlTemplate: path.join(__dirname, 'templates', 'html.hbs'),
    dest: dest,
    files: icons,
    embed: false,
    fontName: fontName,
    cssDest: path.join(dest,fontName,fontName+'.css'),
    cssTemplate: path.join(__dirname, 'templates', 'css.hbs'),
    templateOptions: {
      classPrefix: options.prefix+'-',
      baseSelector: options.prefix,
    }
  }
}

// 
// /* name of font to be used for everything */
// var fontName  = pkg.name;
// var destinationFolder = ''
// 
// /* source folder of all icons */
// var source    = "./icons/*.svg"
// 
// /* destination folder for all iconfont related files */
// var dest      = path.join(__dirname, '..', 'build');
// 
// /* gather all icons from source folder */
// glob(source,function(err,files) {  
//   if(err) {
//     console.log("Error!",err)
//   } else {
//     createIconFont(fontName,files);
//   }
// });
// 
// /* method to create a iconfont */
// function createIconFont(fontName,files) {
// 
//   // https://github.com/sunflowerdeath/webfonts-generator#options
//   // we run the generator twice.
//   // one is for html and css template 
//   var OPTIONS = {
//     html:  true,
//     htmlTemplate: path.join(__dirname, 'templates', 'html.hbs'),
//   	dest: path.join(dest,fontName),
//   	files: files,
//     embed: false,
//   	fontName: fontName,
//     cssDest: path.join(dest,fontName,fontName+'.css'),    
//     cssTemplate: path.join(__dirname,'templates','css.hbs'),    
//   }
// 
//   webfontsGenerator(OPTIONS, function(error) {
//   	if (error) console.log('Fail!', error)
//   	else console.log('preview Done!')
//   })
// 
//   // one is for scss template 
//   var OPTIONS = {
//     html:  false,
//   	dest: path.join(dest,fontName),
//   	files: files
//     embed: false,
//   	fontName: fontName,
//     cssFontsUrl: "fonts/"+fontName+"/",
//     cssDest: path.join(dest,fontName+"/"+fontName+'.scss'),    
//     cssTemplate: path.join(__dirname,'templates','scss.hbs'),    
//   }
// 
//   webfontsGenerator(OPTIONS, function(error) {
//   	if (error) console.log('Fail!', error)
//   	else console.log('iconfont Done!')
//   })
//   
// }
// 

const checkDirectory = (directory) => {
  if (fs.existsSync(directory)) {
    return true;
  } else {
    return false;
  }
}

// =============================================================================
// CREATE ICON FONT
// =============================================================================
program
  .command('create [source]')
  .description('create an iconfont')
  .option(
    "-r, --root <currentWorkDirectory>",
    "root of your project.",
    path.join(process.cwd())
  )
  .option(
    "-f, --fontname <fontname>",
    "name of the iconfont",
    "dmdr-icons"
  )
  .option(
    "-d, --destination <destinationFolder>",
    "folder for the resulting files",
    "dist"
  )
  .option(
    "-p, --prefix <prefix>",
    "prefix for the iconfont",
    "dmdri"
  )
  .option(
    "-s, --source <sourceDirectory>", 
    "source folder of SVG files for the iconfont",
    path.join("src","icons")
  )
  .action((env, options) => {
    let sourceDirectory = path.join(options.root,options.source);
    console.log(sourceDirectory);
    if(checkDirectory(sourceDirectory)) {
      console.log(chalk.cyan("loading svg files from: "+sourceDirectory));
      let pattern = "*.svg";
      let iconsGlob = new Glob(
        pattern,
        {
          cwd: sourceDirectory,
          absolute: true
        },
        (err,icons) => {
          icons.forEach((icon) => {
            console.log(chalk.bold("*** "+icon));
          }
        )
        webfontsGenerator(
          getOptions(process.cwd(),options,icons), 
          (error) => {
            if (error) console.log('Fail!', error)
            else console.log('preview Done!')
          }
        )
        
      });
            
    } else {
      console.error(chalk.red("directory not found: "+sourceDirectory));
    }
  });


// =============================================================================
// EXTRACT ICONS 
// =============================================================================
program
  .command('extract')
  .description('create an iconfont')
  .option(
    "-d, --destination <destinationDirectory>",
    "destination folder for the extracted SVG files.",
    "sourceDirectory"
  )
  .action((env, options) => {
    let destinationDirectory = path.join(options.root,options.destination);
    if(checkDirectory(destinationDirectory)) {
      console.log(chalk.cyan("loading svg files from: "+destinationDirectory));
    } else {
      console.error(chalk.red("directory not found: "+destinationDirectory));
    }    
  });


program
  .parse(process.argv);
