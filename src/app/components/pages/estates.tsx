import React, { FC, useState } from 'react';
import { Layout, Menu } from 'antd';

import { OEstateChart } from '../organisms/estate-chart';

import wynajemMieszkanieWroclaw from '../../../data/estates/wynajem-mieszkanie-wroclaw.json';
import sprzedazMieszkaniePierwotnyWroclaw from '../../../data/estates/sprzedaz-mieszkanie-pierwotny-wroclaw.json';
import sprzedazMieszkanieWtornyWroclaw from '../../../data/estates/sprzedaz-mieszkanie-wtorny-wroclaw.json';

import wynajemMieszkanieWarszawa from '../../../data/estates/wynajem-mieszkanie-warszawa.json';
import sprzedazMieszkaniePierwotnyWarszawa from '../../../data/estates/sprzedaz-mieszkanie-pierwotny-warszawa.json';
import sprzedazMieszkanieWtornyWarszawa from '../../../data/estates/sprzedaz-mieszkanie-wtorny-warszawa.json';

import wynajemMieszkanieKrakow from '../../../data/estates/wynajem-mieszkanie-krakow.json';
import sprzedazMieszkaniePierwotnyKrakow from '../../../data/estates/sprzedaz-mieszkanie-pierwotny-krakow.json';
import sprzedazMieszkanieWtornyKrakow from '../../../data/estates/sprzedaz-mieszkanie-wtorny-krakow.json';

import wynajemMieszkanieGdansk from '../../../data/estates/wynajem-mieszkanie-gdansk.json';
import sprzedazMieszkaniePierwotnyGdansk from '../../../data/estates/sprzedaz-mieszkanie-pierwotny-gdansk.json';
import sprzedazMieszkanieWtornyGdansk from '../../../data/estates/sprzedaz-mieszkanie-wtorny-gdansk.json';

const { Content, Sider } = Layout;

type SelectedEstateItem = |
  'wynajem-mieszkanie-wroclaw' |
  'sprzedaz-mieszkanie-pierwotny-wroclaw' |
  'sprzedaz-mieszkanie-wtorny-wroclaw' |
  'wynajem-mieszkanie-warszawa' |
  'sprzedaz-mieszkanie-pierwotny-warszawa' |
  'sprzedaz-mieszkanie-wtorny-warszawa' |
  'wynajem-mieszkanie-krakow' |
  'sprzedaz-mieszkanie-pierwotny-krakow' |
  'sprzedaz-mieszkanie-wtorny-krakow' |
  'wynajem-mieszkanie-gdansk' |
  'sprzedaz-mieszkanie-pierwotny-gdansk' |
  'sprzedaz-mieszkanie-wtorny-gdansk'

export const Estates: FC = () => {

  const [selectedItem, setSelectedItem] = useState<SelectedEstateItem>('wynajem-mieszkanie-wroclaw')

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={200}
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedItem]}
          style={{ height: '100%' }}
          onSelect={({ key }) => setSelectedItem(key as SelectedEstateItem)}
          defaultOpenKeys={['wroclaw']}
        >
          <Menu.SubMenu key="wroclaw" title="Wrocław">
            <Menu.Item key='wynajem-mieszkanie-wroclaw'>Wynajem</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-pierwotny-wroclaw'>Sprzedaż / pierwotny</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-wtorny-wroclaw'>Sprzedaż / wtórny</Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="warszawa" title="Warszawa">
            <Menu.Item key='wynajem-mieszkanie-warszawa'>Wynajem</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-pierwotny-warszawa'>Sprzedaż / pierwotny</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-wtorny-warszawa'>Sprzedaż / wtórny</Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="krakow" title="Kraków">
            <Menu.Item key='wynajem-mieszkanie-krakow'>Wynajem</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-pierwotny-krakow'>Sprzedaż / pierwotny</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-wtorny-krakow'>Sprzedaż / wtórny</Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="gdansk" title="Gdańsk">
            <Menu.Item key='wynajem-mieszkanie-gdansk'>Wynajem</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-pierwotny-gdansk'>Sprzedaż / pierwotny</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-wtorny-gdansk'>Sprzedaż / wtórny</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Content style={{ minHeight: 680, padding: 20 }}>

        { selectedItem === 'wynajem-mieszkanie-wroclaw' && (
          <OEstateChart
            data={wynajemMieszkanieWroclaw}
            title='Wrocław - Wynajem mieszkań'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-pierwotny-wroclaw' && (
          <OEstateChart
            data={sprzedazMieszkaniePierwotnyWroclaw}
            title='Wrocław - Sprzedaż mieszkań (pierwotny)'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-wtorny-wroclaw' && (
          <OEstateChart
            data={sprzedazMieszkanieWtornyWroclaw}
            title='Wrocław - Sprzedaż mieszkań (wtorny)'
          />
        )}

        { selectedItem === 'wynajem-mieszkanie-warszawa' && (
          <OEstateChart
            data={wynajemMieszkanieWarszawa}
            title='Wrocław - Wynajem mieszkań - Cena'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-pierwotny-warszawa' && (
          <OEstateChart
            data={sprzedazMieszkaniePierwotnyWarszawa}
            title='Wrocław - Sprzedaż mieszkań (pierwotny)'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-wtorny-warszawa' && (
          <OEstateChart
            data={sprzedazMieszkanieWtornyWarszawa}
            title='Wrocław - Sprzedaż mieszkań (wtorny)'
          />
        )}

        { selectedItem === 'wynajem-mieszkanie-krakow' && (
          <OEstateChart
            data={wynajemMieszkanieKrakow}
            title='Wrocław - Wynajem mieszkań - Cena'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-pierwotny-krakow' && (
          <OEstateChart
            data={sprzedazMieszkaniePierwotnyKrakow}
            title='Wrocław - Sprzedaż mieszkań (pierwotny)'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-wtorny-krakow' && (
          <OEstateChart
            data={sprzedazMieszkanieWtornyKrakow}
            title='Wrocław - Sprzedaż mieszkań (wtorny)'
          />
        )}

        { selectedItem === 'wynajem-mieszkanie-gdansk' && (
          <OEstateChart
            data={wynajemMieszkanieGdansk}
            title='Wrocław - Wynajem mieszkań - Cena'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-pierwotny-gdansk' && (
          <OEstateChart
            data={sprzedazMieszkaniePierwotnyGdansk}
            title='Wrocław - Sprzedaż mieszkań (pierwotny)'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-wtorny-gdansk' && (
          <OEstateChart
            data={sprzedazMieszkanieWtornyGdansk}
            title='Wrocław - Sprzedaż mieszkań (wtorny)'
          />
        )}

      </Content>
    </Layout>
  );
}
