<a name="0.5.2"></a>
### 0.5.2 (2015-09-05)


#### Bug Fixes

* **$bbcTransport:** do not wrap rest errors in Error object if they are already an object ([085cdf0d](https://github.com/litixsoft/baboon-client/commit/085cdf0d3a8b438e4b1b33828245efd6d2122662))


<a name="0.5.1"></a>
### 0.5.1 (2014-11-21)


#### Bug Fixes

* **bbcCheckbox:** Works now correct when the initial value is falsy ([b493fa5c](https://github.com/litixsoft/baboon-client/commit/b493fa5c3f6a3d9fadc78a8fd3acc24bf505ed64))


<a name="0.5.0"></a>
## 0.5.0 (2014-11-20)


#### Features

* update to angular.js 1.3.3 ([56767411](https://github.com/litixsoft/baboon-client/commit/5676741120114f07ecb565b055ec6c30162233d2))


<a name="0.4.11"></a>
### 0.4.11 (2014-08-10)


#### Bug Fixes

* **bbcPager:** only trigger loading of data when the currentPage is a number an greater than 0 ([9a91a04b](https://github.com/litixsoft/baboon-client/commit/9a91a04b5581d812f89b58ecdbda6c28a865b1ab))


<a name="0.4.10"></a>
### 0.4.10 (2014-08-04)


#### Features

* **$bbcModal:** add option size ([7e4375b4](https://github.com/litixsoft/baboon-client/commit/7e4375b4d6ab05370957b4ebaa314b08067344cc))


<a name="0.4.9"></a>
### 0.4.9 (2014-07-29)


#### Bug Fixes

* **bbcCheckbox:** make scope variables optional so that the directive will work when there is no n ([edbc2530](https://github.com/litixsoft/baboon-client/commit/edbc25308e1b317e480ff123189a4ab66814fcf0))


<a name="0.4.8"></a>
### 0.4.8 (2014-07-22)


#### Features

* **$bbcModal:**
  * add option buttonMinWidth to set the min-width in pixel ([810d58c5](https://github.com/litixsoft/baboon-client/commit/810d58c5a257a2cf42f266a8679bf9aed709ae13))
  * add option buttonOrder when open a new modal window ([a7447fd4](https://github.com/litixsoft/baboon-client/commit/a7447fd4cd1fda3159cf01c4ba575a06a40ed781))


<a name="0.4.7"></a>
### 0.4.7 (2014-07-14)


#### Features

* update to Angular.JS 1.2.20 ([e11cd633](https://github.com/litixsoft/baboon-client/commit/e11cd6337b169cc1e554e83b1ecbcabca3d93efa))


<a name="0.4.6"></a>
### 0.4.6 (2014-07-08)


#### Bug Fixes

* add margin to bbc-checkbox to fix style error in combination with twitter bootst ([842a8333](https://github.com/litixsoft/baboon-client/commit/842a83339f4368f64c71e00274726582a198065f))


<a name="0.4.5"></a>
### 0.4.5 (2014-07-07)


#### Features

* update to AngularJS 1.2.19 ([0f0d5247](https://github.com/litixsoft/baboon-client/commit/0f0d5247c92ba239df096dc824f1671e196911b9))


<a name="0.4.4"></a>
### 0.4.4 (2014-06-25)


#### Bug Fixes

* **bbc.checkbox:** checkbox was selected when ng-model was undefined ([a4723758](https://github.com/litixsoft/baboon-client/commit/a4723758f518a40439d08ca15921a874bd0e099b))


#### Features

* **bbc.modal:** backdrop default value is set to true ([a57a7a9e](https://github.com/litixsoft/baboon-client/commit/a57a7a9ef40a6b5229ffb021dd968fc667455666))


<a name="0.4.3"></a>
### 0.4.3 (2014-06-24)


#### Features

* **bbc.checkbox:**
  * works now with ng-disabled ([82c99578](https://github.com/litixsoft/baboon-client/commit/82c99578875215a364a3a07e9be113cf2c40b92d))
  * works now with ng-disabled ([b8e6c0a8](https://github.com/litixsoft/baboon-client/commit/b8e6c0a86ce03d265e36831f3598e715d2ce3fc5))


<a name="0.4.2"></a>
### 0.4.2 (2014-06-18)


#### Features

* update to angular 1.2.18 ([13258444](https://github.com/litixsoft/baboon-client/commit/132584440db4be1f910cac5856134949b934f381))


<a name="0.4.1"></a>
### 0.4.1 (2014-06-13)


#### Features

* update bower dependencies ([b1f620c8](https://github.com/litixsoft/baboon-client/commit/b1f620c804457440df783b12845e8d8934a86b93))


## v0.3.0
* add function transport.on() to listen to socket events
* add lxDatepicker directive
* add lx-radio and lx-checkbox directives to have radio buttons and checkboxes that looks the same in every browser and OS
* highlight the active link in the menu
* make menu responsive
* fix error in lx.pager that button 'next Page' and 'last Page' are enabled when current page is greater than number of pages
* navigation now uses names instead of numbers to find children

### v0.2.9
* update angular to v1.2.2
* update angular-translate to v1.1.1
* add transport.rest() to make rest only calls over the transport layer
* update navigation and session to use transport.rest()
* add .jshintrc

### v0.2.8
* update api/v1
* remove auth

### v0.2.7
* remove passport auth

### v0.2.6
* integrate charts
* update design
* update auth
* bugfixes
* refactoring

### v0.2.5
* sync with baboon actual version

## v0.2.0
* include and rename module
* tests

## v0.1.0
*  project init