---
layout: page
homepage: true
---

# Overview

> This is a [Jekyll theme](https://github.com/allejo/jekyll-docs-theme) based on [mistic100's modification](https://github.com/mistic100/jekyll-bootstrap-doc) of the official Bootstrap documentation from a few years back.

Jekyll Docs Theme is provided as a theme for writing documentation for your projects instead of having a single large README file or several markdown files stored in a not so user-friendly manner.

This theme is still in development but is kept fairly stable; just note, there are a lot things yet to come.

# Installation

Add this line to your Jekyll site's Gemfile:

```ruby
gem "jekyll-docs-theme"
```

And add this line to your Jekyll site's _config.yml:

```yaml
theme: jekyll-docs-theme
```

And then execute:

```
$ bundle
```

Or install it yourself as:

```
$ gem install jekyll-docs-theme
```

<div class="alert alert-warning" markdown="1">
**Warning:** Custom [themes are not supported on GitHub Pages](https://pages.github.com/themes/) at the time of writing this, so you may either build your site on another platform or simply fork this repo and build upon it as you would any other theme.
</div>

# Configuration Options

A sample [`_config.yml`](https://github.com/allejo/jekyll-docs-theme/blob/master/docs/_config.yml) file is available with all of the available fields; documentation and more information for each of those fields is available below.

## Project

The project object can be specified with information related to the software this; this information will appear on the homepage's jumbotron area.

```yaml
project:
  version: 1.0.0
  download_url: https://github.com/USER/PROJECT/releases
```

{:.table}
| field | description |
| ----- | ----------- |
| `version` | The current version of the software |
| `download_url` | The URL to the current download |

## Licenses

The license object accepts four fields regarding information about the licensing of your software and documentation.

```yaml
license:
  software: MIT License
  software_url: http://opensource.org/licenses/MIT

  docs: CC BY 3.0
  docs_url: http://creativecommons.org/licenses/by/3.0/
```

{:.table}
| field | description |
| ----- | ----------- |
| `software` | The license the software is distributed under |
| `software_url` | A URL to the license text for the license specified in `software` |
| `docs` | The license this documentation is distributed under |
| `docs_url` | A URL to the license text for the license specified in `docs` |

## Links

The links object has two subobjects, `header` and `footer`; both of these objects accept an array of elements with a `title` and `url`. The links defined in the `header` object will appear in the navigation of the website and the links in the `footer` will appear at the bottom of the website.

```yaml
links:
  header:
    - title: GitHub
      url: https://github.com/allejo/jekyll-docs-theme
  footer:
    - title: GitHub
      url: https://github.com/allejo/jekyll-docs-theme
    - title: Issues
      url: https://github.com/allejo/jekyll-docs-theme/issues?state=open
```

{:.table}
| field | description |
| ----- | ----------- |
| `title` | The textual representation of the URL |
| `url` | The URL of the link |

## UI

The ui object will contain all the settings in regards to the aesthetics of the website

```yaml
ui:
  header:
    color1: "#080331"
    color2: "#673051"
    trianglify: true
```

{:.table}
| field | description |
| ----- | ----------- |
| `color1` & `color2` | The two colors that will create the gradient of the page header |
| `trianglify` | When set to true, the page header will be a generated triangular pattern |

## Analytics

```yaml
analytics:
    google: UA-123456-1
```

{:.table}
| field | description |
| ----- | ----------- |
| `google` | The unique identifier for Google Analytics; typically looks like `U-123456-1`

## Social

Options for configuring buttons to "like", "tweet" or "star" this site with the respective social media websites.

```yaml
social:
  github:
    user: allejo
    repo: jekyll-docs-theme
  twitter:
    enabled: false
    via:
    hash:
    account:
  facebook:
    enabled: false
    profileUrl:
```
