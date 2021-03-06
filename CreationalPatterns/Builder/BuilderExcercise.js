class CodeBuilder
{
  constructor(className)
  {
    // todo
    this.className = className;
    this.fields = [];
  }

  addField(name)
  {
    // todo
    // reminder: we want a fluent interface
    this.fields.push(name);
    return this;
  }

  toString()
  {
    // todo
    let code = '';
    code += `class ${this.className} {\n`
    if(this.fields.length !== 0){
        code += `  constructor(${this.fields.join(', ')}){ \n`
        for(let field of this.fields){
            code += `    this.${field} = ${field};\n`
        }
        code += '  }\n';
    }
    code += '}'

    return code;
  }
}

let cb = new CodeBuilder('Person');
//cb.addField('name').addField('age');
console.log(cb.toString())