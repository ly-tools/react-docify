## Dependencies

* react
* babel


## Class::Component

Display Name: Component

SuperClass Name: React.Component


### Methods

* getValue(): get value description
* setValue(value, config): set value description


### Class Properties

| Name | Description | Static | Value |
| :--- | :----- | :--: | :--- |
| someStaticObj |  | √ | {  key: 'value' } |
| someStaticFunc |  | √ | () => {} |
| someStaticProps | Description of someStaticProps | √ | 'asdf' |
| someProps | Description of someProps | × | 'aaa' |


### PropTypes

| Name | Description | Type | Required | Default Value |
| :--- | :----- | :--- | :---: | :---: |
| optionalArray | Description of optionalArray. | Array | × | `[]` |
| optionalBool | Description of optionalBool. | Boolean | × | `false` |
| optionalFunc | Description of optionalFunc. | Function | × | `() => {}` |
| optionalNumber | Description of optionalNumber. | Number | × | `123` |
| optionalObject | Description of optionalObject. | Object | × | `{}` |
| optionalString | Description of optionalString. | String | × | `'abc'` |
| optionalNode | Description of optionalNode. | Node | × | `null` |
| optionalElement | Description of optionalElement. | Element | × | `null` |
| optionalMessage | Description of optionalMessage. | Class(Message) | √ | `null` |
| optionalEnum | Description of optionalEnum. | News│Photos | × | `'News'` |
| optionalUnion | Description of optionalUnion. | String│Number│Class(Message) | × | `null` |
| optionalArrayOf | Description of optionalArrayOf. | Array(Number) | × | `[1, 2, 3]` |
| optionalObjectOf | Description of optionalObjectOf. | ObjectOf | × | `{}` |
| optionalObjectWithShape | Description of optionalObjectWithShape. | {"color":"","fontSize":""} | × | `{   color: 'red',   fontSize: 14 }` |
| requiredFunc | Description of requiredFunc. | Function | √ | `() => {}` |
| requiredAny | Description of requiredAny. | Any | √ | `false` |
| customProp | Description of customProp. | Custom Validator | × | `null` |
| notDefinedProp |  |  | × | `null` |
| privateProp | [private] Description of multilineProp. | String | × |  |
| multilineProp | Description of multilineProp. This should be multiline Anything else ? | String | × |  |
| noDefaultValueProp | Description of noDefaultValueProp. | String | × |  |
