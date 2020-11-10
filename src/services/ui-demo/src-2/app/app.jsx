import Highlight, { defaultProps as defaultHighlightProps } from 'prism-react-renderer';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import joinPaths from 'packages/geoadv-utils/join-paths';

import cn from 'packages/ui/cn';
import Heading from 'packages/ui/heading';
import Link from 'packages/ui/link';
import Menu from 'packages/ui/menu';
import Modal from 'packages/ui/modal';
import Select from 'packages/ui/select';
import Spinner from 'packages/ui/spinner';
import TabItem from 'packages/ui/tab-item';
import Tabs from 'packages/ui/tabs';
import ThemeProvider from 'packages/ui/theme-provider';

import { Themes } from 'packages/ui/vars';

import './app.css';

const parseComponentPath = (componentFullPath) => ({
  componentName: componentFullPath.match(/([^/]+)$/)[1],
  packageName: componentFullPath.match(/^([^/]+)/)[1],
});

@cn('demo')
export class App extends PureComponent {
  static propTypes = {
    config: PropTypes.shape({
      components: PropTypes.arrayOf(PropTypes.string),
      component: PropTypes.shape({
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        settings: PropTypes.arrayOf(PropTypes.string),
      }),
      colors: PropTypes.shape({}),
      basename: PropTypes.string.isRequired,
      version: PropTypes.string.isRequired,
    }),
  };

  state = {
    isComponentLoaded: false,
    sourceCodeModalShown: false,
    framelessNavShown: false,
    theme: this.getInitialTheme(),
  };

  currentComponent;

  async componentDidMount() {
    const { component, components, basename } = this.props.config;

    if (this.isValidComponentParam()) {
      let currentComponent;

      if (component.extension === 'jsx') {
        currentComponent = await import(`packages/${component.name}/demo.jsx`);
      }
      if (component.extension === 'tsx') {
        currentComponent = await import(`packages/${component.name}/demo.tsx`);
      }

      this.currentComponent = currentComponent.default;
      this.setComponentLoaded();
    } else {
      window.location.href = `${basename}/${components[0]}`;
    }
  }

  isValidComponentParam() {
    const { component: currentComponent, components } = this.props.config;
    return Boolean(components.find((component) => new RegExp(`${currentComponent}$`).test(component)));
  }

  prepareMenuItems() {
    const { component: currentComponent, components, basename } = this.props.config;

    const groups = components.reduce((groups, componentFullPath) => {
      const { componentName, packageName } = parseComponentPath(componentFullPath);

      const menuItem = {
        value: componentName,
        content: componentName,
        props: {
          url: joinPaths(basename, componentFullPath),
          disabled: currentComponent && currentComponent.name === componentFullPath,
        },
      };

      if (!groups[packageName]) {
        groups[packageName] = [menuItem];
      } else {
        groups[packageName].push(menuItem);
      }

      return groups;
    }, {});

    return Object.keys(groups).map((groupName) => ({
      type: 'group',
      title: `${groupName}/`,
      content: groups[groupName],
    }));
  }

  prepareSelectOptions() {
    const { components } = this.props.config;

    const groups = components.reduce((groups, componentFullPath) => {
      const { componentName, packageName } = parseComponentPath(componentFullPath);

      const option = {
        value: componentFullPath,
        text: componentName,
      };

      if (!groups[packageName]) {
        groups[packageName] = [option];
      } else {
        groups[packageName].push(option);
      }

      return groups;
    }, {});

    return Object.keys(groups).map((groupName) => ({
      type: 'group',
      title: `${groupName}/`,
      content: groups[groupName],
    }));
  }

  getInitialTheme() {
    if (typeof window === 'undefined') {
      return;
    }

    const themeFromHash = window.location.hash && window.location.hash.substring(1);
    const matchedTheme = Object.values(Themes).find((theme) => theme === themeFromHash);

    return matchedTheme || Themes.onWhite;
  }

  getTheme() {
    const { component } = this.props.config;
    const { theme } = this.state;
    const isBlueComponent = component && component.settings.includes('theme-blue');

    return isBlueComponent ? Themes.blue : theme;
  }

  setComponentLoaded() {
    this.setState({ isComponentLoaded: true });
  }

  handleOnWhiteTabClick = () => {
    this.setState({
      theme: Themes.onWhite,
    });

    window.location.hash = Themes.onWhite;
  };

  handleOnColorTabClick = () => {
    this.setState({
      theme: Themes.onColor,
    });

    window.location.hash = Themes.onColor;
  };

  handleSelectChange = (component) => {
    const { basename } = this.props.config;
    window.location.href = joinPaths(basename, component);
  };

  handleFramelessNavToggle = () => {
    this.setState({
      framelessNavShown: !this.state.framelessNavShown,
    });
  };

  handleSourceCodeModalShow = () => {
    this.setState({
      sourceCodeModalShown: true,
    });
  };

  handleSourceCodeModalHide = () => {
    this.setState({
      sourceCodeModalShown: false,
    });
  };

  renderNav(cn) {
    const { component: currentComponent, version } = this.props.config;

    return (
      <>
        <div className={cn('nav', { desktop: true })}>
          <Heading className={cn('header')}>Уи-иии</Heading>
          <div className={cn('nav-box')}>
            <Menu content={this.prepareMenuItems()} />
          </div>
          <div className={cn('version')}>{version}</div>
        </div>
        <div className={cn('nav', { mobile: true })}>
          <Select
            options={this.prepareSelectOptions()}
            value={[currentComponent && currentComponent.name]}
            onChange={this.handleSelectChange}
            width="available"
            mode="radio"
            size="s"
          />
        </div>
      </>
    );
  }

  renderFramelessNav(cn) {
    const { component } = this.props.config;
    const { framelessNavShown } = this.state;

    return (
      <ThemeProvider theme={Themes.onColor}>
        <div className={cn('frameless-nav')}>
          <Link text={framelessNavShown ? 'Hide' : 'Nav'} onClick={this.handleFramelessNavToggle} size="s" pseudo />
          {' • '}
          <Link text="Code" onClick={this.handleSourceCodeModalShow} size="s" pseudo />
          {framelessNavShown && (
            <div className={cn('frameless-nav-controls')}>
              <Select
                className={cn('frameless-nav-control')}
                options={this.prepareSelectOptions()}
                value={[component && component.name]}
                onChange={this.handleSelectChange}
                size="s"
                mode="radio"
              />
            </div>
          )}
        </div>
      </ThemeProvider>
    );
  }

  renderThemeTabs(cn) {
    const { theme } = this.state;

    return (
      <Tabs className={cn('tabs')}>
        <TabItem checked={theme === Themes.onWhite} onClick={this.handleOnWhiteTabClick}>
          On white
        </TabItem>
        <TabItem checked={theme === Themes.onColor} onClick={this.handleOnColorTabClick}>
          On color
        </TabItem>
      </Tabs>
    );
  }

  renderCurrentComponentDemo() {
    const CurrentComponent = this.currentComponent;
    return <CurrentComponent theme={this.getTheme()} key={this.getTheme()} colors={this.props.config.colors} />;
  }

  renderCurrentComponentSourceCode() {
    return (
      <Highlight {...defaultHighlightProps} code={this.props.config.component.code} language="jsx" theme={undefined}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })} key={i}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} key={key} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  }

  renderCurrentComponentSourceCodeModal(cn) {
    return (
      <Modal
        className={cn('source-code-modal')}
        visible={this.state.sourceCodeModalShown}
        onClose={this.handleSourceCodeModalHide}
        type="adaptive"
      >
        {this.renderCurrentComponentSourceCode(cn)}
      </Modal>
    );
  }

  renderFramelessComponent(cn) {
    const { isComponentLoaded } = this.state;

    if (!isComponentLoaded) {
      return <Spinner view="fixed" size="l" />;
    }

    return (
      <ThemeProvider theme={this.getTheme()}>
        <>
          {this.renderCurrentComponentDemo(cn)}
          {this.renderCurrentComponentSourceCodeModal(cn)}
        </>
      </ThemeProvider>
    );
  }

  renderFramedComponent(cn) {
    const { component: currentComponent } = this.props.config;
    const { isComponentLoaded } = this.state;
    const noThemes = currentComponent.settings.includes('no-themes');
    const noCode = currentComponent.settings.includes('no-code');

    const theme = this.getTheme();

    if (!isComponentLoaded) {
      return <Spinner view="fixed" size="l" />;
    }

    return (
      <>
        <ThemeProvider theme={theme}>
          <div className={cn('preview', { dark: theme === Themes.onColor })}>
            {currentComponent && isComponentLoaded && (
              <>
                <Heading className={cn('component-name')} size="xl">
                  {currentComponent.name}
                </Heading>
                {theme !== Themes.blue && !noThemes && this.renderThemeTabs(cn)}
                {this.renderCurrentComponentDemo(cn)}
                {!noCode && (
                  <div className={cn('code')}>
                    <Heading size="m">Code</Heading>
                    <div className={cn('source')}>{this.renderCurrentComponentSourceCode(cn)}</div>
                  </div>
                )}
              </>
            )}
          </div>
        </ThemeProvider>
      </>
    );
  }

  render(cn) {
    const { component: currentComponent } = this.props.config;

    if (!currentComponent) {
      return this.renderNav(cn);
    }

    if (currentComponent.settings.includes('display-without-frame')) {
      return (
        <>
          {this.renderFramelessNav(cn)}
          {this.renderFramelessComponent(cn)}
        </>
      );
    }

    return (
      <>
        {this.renderNav(cn)}
        {this.renderFramedComponent(cn)}
      </>
    );
  }
}
