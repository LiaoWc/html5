var fs = require('fs');
// var getHash = require('hash-stream')
    //脚本目录
var scripts_des_dir = "debug/scripts/";
//图片src目录
var res_des_dir = "fileTest/";
//图片des目录
var res_src_dir = "assets/plist/";
//图片名和文件对应列表
var res_array = {};

//获取路径中的文件的扩展名
function get_file_type(file_name) {
    return file_name.substring(file_name.lastIndexOf("."), file_name.length);
}
//获取路径中的文件名
function get_file_name(path) {
    return path.substring(0, path.lastIndexOf("."));
}

//先检测png文件
function file_detect(file_name, src_dir, des_dir, cb) {
    var src_path = src_dir + file_name;
    var file_type = get_file_type(file_name)
    getHash(src_path, 'sha1', function(err, hash) {
        hash = hash.toString('hex').substr(0, 8);
        if (err) throw err;
        res_array[file_name] = hash + file_type;
        var des_path = des_dir + res_array[file_name];
        var readable = fs.createReadStream(src_path);
        var writable = fs.createWriteStream(des_path);
        readable.pipe(writable);
        if (cb) {
            cb();
        }
    })
}

function plist_detect(file_name, src_dir, des_dir, cb) {
    //原文件路径
    var src_path = src_dir + file_name;
    //目标路径
    var des_path = des_dir + file_name;
    var file_type = get_file_type(file_name)
        //获取atlas对应的png名字
    var png_name = get_file_name(file_name) + ".png"
    var hash_png_name = res_array[png_name]
    fs.readFile(src_path, {
            encoding: "utf-8"
        },
        function(err, data) {
            if (err) throw err;
            data = data.replace(png_name, hash_png_name);
            data = data.replace(png_name, hash_png_name);
            
        });
}

function clean_dir() {
    console.log("清理" + res_des_dir + "目录文件->")
    fs.readdir(res_des_dir, function(err, paths) {
        if (err) {
            throw err;
        }
        console.log(paths)
        paths.forEach(function(file_name) {
            fs.unlink(res_des_dir + file_name, function() {})
        });
    });
}



//遍历src中的资源生成src_list
function order_images(src_path, des_path) {
    var file_count = 0;
    var read_count = 0;
    fs.readdir(src_path, function(err, paths) {
        if (err) {
            throw err;
        }
        paths.forEach(function(file_name) {
            var file_type = get_file_type(file_name)
            if (file_type == '.plist' || file_type == '.png') {

            } else {
                return
            }
            ++file_count;
            res_array[file_name] = "";
        });
        console.log("处理png");
        for (var i in res_array) {
            var t = get_file_type(i)
            if (t == ".png") {
                file_detect(i, src_path, des_path, function() {
                    ++read_count;
                    if (read_count == file_count / 2) {
                        console.log("处理plist");
                        for (var i in res_array) {
                            var t = get_file_type(i)
                            if (t == ".plist")
                                plist_detect(i, src_path, des_path, function() {
                                    ++read_count;
                                    if (read_count == file_count) {
                                        update_game_resource(des_path);
                                    }
                                });
                        }
                    }
                });
            }
        }
    });
};


function update_game_resource() {
    var dir = "plist/"
    var head = 'game_plist = {\n'
    var tail = '}'
    var body = '';
    var is_first = true;
    for (var i in res_array) {
        var index = i.split("/"); //这里要将 \ 转义一下
        index = index[index.length - 1]
        index = index.replace(".", "_");
        if (is_first) {
            is_first = false;
            body += index + ':"' + dir + res_array[i];
        } else {
            body += '",\n' + index + ':"' + dir + res_array[i];
        }
    }
    body += '"\n'
    fs.writeFile(scripts_des_dir + 'game_plist.js', head + body + tail, function(err) {
        if (err) throw err;
        console.log('更新资源列表文件！');
    });
}


function main() {
    clean_dir();
    var tFunction = {
        name = "Print",
        args = ["table"],
        proc = [],
        result = ["table"]
    }
    var data = "print 'hello'" ;
    

    fs.writeFile(res_des_dir + 't1.lua', data, function(err) {
                if (err) throw err;
                
            })
    // order_images(res_src_dir, res_des_dir);
}

main();