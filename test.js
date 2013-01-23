var fsobj = require('./index')
  , fs = require('fs')
  , path = require('path')

it('should list files and directories', function(){
    Object.keys(fsobj('testdata')).should.eql(fs.readdirSync('testdata'))
})

it('should read files', function() {
    fsobj('testdata').top.should.equal('top file\n')
})

it('should read subdirectories', function() {
    Object.keys(fsobj('testdata').subdir).should.eql(fs.readdirSync('testdata/subdir'))
})

it('should read files in subdirectories', function() {
    fsobj('testdata').subdir.file.should.equal('subdir first file\n')
})

it('should strip the postfix on files', function() {
    fsobj('testdata', '.ext').subdir.extfile.should.equal('content of extfile\n')
})

it('should not strip the postfix on directories', function() {
    fsobj('testdata', '.ext').subdir.should.have.property('dir.ext').and.should.not.have.property('dir')
})
