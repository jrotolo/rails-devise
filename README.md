Rails React Devise
================

This is a starter rails app which includes:
- Rails 4.1
- React.js
- Devise Authentication and Users / Pundit
- Foundation 5
- RSpec, Capybara, Factory Girl (Testing)

Getting Started
---------------

Clone this repo to get started. Users and basic user groups are already setup with Devise and Pundit.

#### Some Useful Generators
```bash
rails generate react:component Post title:string body:string published:bool published_by:instanceOf{Person}
```
