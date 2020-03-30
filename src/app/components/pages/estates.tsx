import React, { FC, useState } from 'react';
import { Layout, Menu } from 'antd';

import { OEstateChart } from '../organisms/estate-chart';

import wynajemMieszkanieWroclawCeny from '../../../data/estates/wynajem-mieszkanie-wroclaw-ceny.json';
import wynajemMieszkanieWroclawLiczba from '../../../data/estates/wynajem-mieszkanie-wroclaw-liczba.json';
import sprzedazMieszkaniePierwotnyWroclawCeny from '../../../data/estates/sprzedaz-mieszkanie-pierwotny-wroclaw-ceny.json';
import sprzedazMieszkaniePierwotnyWroclawLiczba from '../../../data/estates/sprzedaz-mieszkanie-pierwotny-wroclaw-liczba.json';
import sprzedazMieszkanieWtornyWroclawCeny from '../../../data/estates/sprzedaz-mieszkanie-wtorny-wroclaw-ceny.json';
import sprzedazMieszkanieWtornyWroclawLiczba from '../../../data/estates/sprzedaz-mieszkanie-wtorny-wroclaw-liczba.json';

const { Content, Sider } = Layout;

type SelectedEstateItem = |
  'wynajem-mieszkanie-wroclaw' |
  'sprzedaz-mieszkanie-pierwotny-wroclaw' |
  'sprzedaz-mieszkanie-wtorny-wroclaw'

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
          <Menu.SubMenu key="wroclaw" title="Mieszkania - Wrocław">
            <Menu.Item key='wynajem-mieszkanie-wroclaw'>Wynajem</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-pierwotny-wroclaw'>Sprzedaż / pierwotny</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-wtorny-wroclaw'>Sprzedaż / wtórny</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Content style={{ minHeight: 680, padding: 20 }}>

        { selectedItem === 'wynajem-mieszkanie-wroclaw' && (
          <OEstateChart
            dataPrices={wynajemMieszkanieWroclawCeny}
            dataCount={wynajemMieszkanieWroclawLiczba}
            titlePrices='Wrocław - Wynajem mieszkań - Cena'
            titleCount='Wrocław - Wynajem mieszkań - Liczba ogłoszeń'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-pierwotny-wroclaw' && (
          <OEstateChart
            dataPrices={sprzedazMieszkaniePierwotnyWroclawCeny}
            titlePrices='Wrocław - Sprzedaż mieszkań (pierwotny) - Cena za mkw'
            dataCount={sprzedazMieszkaniePierwotnyWroclawLiczba}
            titleCount='Wrocław - Sprzedaż mieszkań (pierwotny) - Liczba ogłoszeń'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-wtorny-wroclaw' && (
          <OEstateChart
            dataPrices={sprzedazMieszkanieWtornyWroclawCeny}
            dataCount={sprzedazMieszkanieWtornyWroclawLiczba}
            titlePrices='Wrocław - Sprzedaż mieszkań (wtorny) - Ceny za mkw'
            titleCount='Wrocław - Sprzedaż mieszkań (wtorny) - Liczba ogłoszeń'
          />
        )}

      </Content>
    </Layout>
  );
}
