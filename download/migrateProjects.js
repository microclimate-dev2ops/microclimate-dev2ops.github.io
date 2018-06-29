//read project infs - loop
const fs = require('fs')
const path = require('path')
const WORKSPACE = '/microclimate-workspace'
const PROJECT_DIR = path.join(WORKSPACE,'.projects');
const USER = 'admin'
const USER_DIR =  path.join(WORKSPACE, USER);

function main (){
  fs.mkdir(USER_DIR, function(){
    readProjectInfs(function(projectInfs){
      updateAndMoveProjects(projectInfs);
    });
    moveConfigAndLogsDirs();
  });

}

function readProjectInfs(cb) {
  fs.readdir(PROJECT_DIR, function(err, files){
    if (err){
      console.error(`Error reading directory ${PROJECT_DIR}`);
      console.error(err);
    } else {
      let projectInfs = []
      for (file of files){
        if (path.extname(file) === '.inf'){
          fs.readFile(path.join(PROJECT_DIR, file), function(err, data){
            if (err){
              console.error(`Error reading file ${file}`);
              console.error(err);
            }
            projectInfs.push(JSON.parse(data));
            if (projectInfs.length === files.length){
              cb(projectInfs);
            }
          });
        }
      }
    }
  });
}

function updateAndMoveProjects(projectInfs){
  //Create new .projects directoy
  const NEW_PROJECT_DIR = path.join(USER_DIR, '.projects');
  fs.mkdir(NEW_PROJECT_DIR, function(){
    for (inf of projectInfs){
      //Add workspace and location
      inf.workspace = path.join(inf.workspace, USER, '/');
      let locOnDisk = `${inf.locOnDisk}/`;
      inf.location = path.join(inf.workspace, inf.name);
      const NEW_INF_PATH = path.join(NEW_PROJECT_DIR,`${inf.name}.inf`);

      //Write the inf to the new directory
      fs.writeFile(NEW_INF_PATH, JSON.stringify(inf), function(err) {
        if (err){
          console.error(`Error writing file ${NEW_INF_PATH}`);
          console.error(err);
        } else {
          console.log(`File written successfully ${NEW_INF_PATH}`)
          //Move associated project directory
          moveProjectDir(inf.name);
        }
      });
    }
  });
}

function moveProjectDir(projectName){
  fs.rename(path.join(WORKSPACE, projectName), path.join(USER_DIR, projectName), function(err){
    if (err){
      console.error(`Error moving project directory for project ${projectName}`);
      console.error(err);
    } else {
      console.log(`Project directory ${projectName} moved successfully`);
    }

  });
}

function moveConfigAndLogsDirs(){
  // Move .config
  fs.rename(path.join(WORKSPACE, '.config'), path.join(USER_DIR, '.config'), function(err){
    if (err){
      console.error(`Error moving .config directory`);
      console.error(err);
    } else {
      console.log(`.config directory successfully moved`);
    }
  });

  // Move .logs
  fs.rename(path.join(WORKSPACE, '.logs'), path.join(USER_DIR, '.logs'), function(err){
    if (err){
      console.error(`Error moving .logs directory`);
      console.error(err);
    } else {
      console.log(`.logs directory successfully moved`);
    }
  });
}

main();