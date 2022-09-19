/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'
import {injectGlobal } from '@emotion/css'

import React from "react"
import {LoginContainer, PolygonBlock, PolygonTitle} from "components/lib"
import {TodoApp} from 'components/polygon/use-reducer/todo'
import {Counter} from 'components/polygon/use-reducer/reducer-example'
import {Theme} from 'components/polygon/use-callback/theme'
import {ToggleTheme} from 'components/polygon/use-context/toggle-theme/toggle-theme'
import {CounterApp} from 'components/polygon/use-context/simple-counter/simple-counter'
import {ToggleApp} from 'components/polygon/advanced-react-patterns/compound-components/compound-components'
import {FlexibleToggleApp} from 'components/polygon/advanced-react-patterns/flexible-compound-components/flexible-compound-components'
import {PropsCollectionsAndGetters} from 'components/polygon/advanced-react-patterns/props-collections-and-getters/props-collections-and-getters'
import {StateReducer} from 'components/polygon/advanced-react-patterns/state-reducer/state-reducer'
import ControllProps from 'components/polygon/advanced-react-patterns/controll-props/controll-props'

injectGlobal`
  body {
    background: #180c1a;
    /* padding-bottom: 200px; */
  }
`

function Polygon(params) {
  return (
    <LoginContainer css={{
      justifyContent: 'initial',
      alignItems: 'initial',
      background: 'none',
      height: 'initial'
    }}>
    <div css={{
      width: '1024px',
      margin: '0 auto'
    }}>
      {/* ===== */}
      <PolygonBlock>
        <PolygonTitle>Reducer simple counter example</PolygonTitle>
        <Counter />
      </PolygonBlock>
      {/* ===== */}
      <PolygonBlock>
        <PolygonTitle>Reducer TODO example</PolygonTitle>
        <TodoApp />
      </PolygonBlock>
      {/* ===== */}
      <PolygonBlock>
        <PolygonTitle>useCallback theme example</PolygonTitle>
        <Theme />
      </PolygonBlock>
      {/* ===== */}
      <PolygonBlock>
        <PolygonTitle>useContext Toggle Theme example</PolygonTitle>
        <ToggleTheme />
      </PolygonBlock>
      {/* ===== */}
      <PolygonBlock>
        <PolygonTitle>useContext Simple Counter example</PolygonTitle>
        <CounterApp />
      </PolygonBlock>
      {/* ===== */}
      <PolygonBlock>
        <PolygonTitle>Compound components</PolygonTitle>
        <ToggleApp />
      </PolygonBlock>
        {/* ===== */}
        <PolygonBlock>
          <PolygonTitle>Flexible Compound components</PolygonTitle>
          <FlexibleToggleApp />
        </PolygonBlock>
        {/* ===== */}
        <PolygonBlock>
          <PolygonTitle>Props collections and getters</PolygonTitle>
          <PropsCollectionsAndGetters />
        </PolygonBlock>
        {/* ===== */}
        <PolygonBlock>
          <PolygonTitle>State Reducer</PolygonTitle>
          <StateReducer />
        </PolygonBlock>
        {/* ===== */}
        <PolygonBlock>
          <PolygonTitle>Controll Props</PolygonTitle>
          <ControllProps />
        </PolygonBlock>
    </div>
    </LoginContainer>
  )
}

export {Polygon}