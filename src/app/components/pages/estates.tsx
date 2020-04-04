import React, { FC, useState } from 'react';
import { Layout, Menu } from 'antd';

import { OEstateChart } from '../organisms/estate-chart';

import wynajemMieszkanieWroclawCeny from '../../../data/estates/wynajem-mieszkanie-wroclaw-ceny.json';
import wynajemMieszkanieWroclawLiczba from '../../../data/estates/wynajem-mieszkanie-wroclaw-liczba.json';
import sprzedazMieszkaniePierwotnyWroclawCeny from '../../../data/estates/sprzedaz-mieszkanie-pierwotny-wroclaw-ceny.json';
import sprzedazMieszkaniePierwotnyWroclawLiczba from '../../../data/estates/sprzedaz-mieszkanie-pierwotny-wroclaw-liczba.json';
import sprzedazMieszkanieWtornyWroclawCeny from '../../../data/estates/sprzedaz-mieszkanie-wtorny-wroclaw-ceny.json';
import sprzedazMieszkanieWtornyWroclawLiczba from '../../../data/estates/sprzedaz-mieszkanie-wtorny-wroclaw-liczba.json';

import wynajemMieszkanieWarszawaCeny from '../../../data/estates/wynajem-mieszkanie-warszawa-ceny.json';
import wynajemMieszkanieWarszawaLiczba from '../../../data/estates/wynajem-mieszkanie-warszawa-liczba.json';
import sprzedazMieszkaniePierwotnyWarszawaCeny from '../../../data/estates/sprzedaz-mieszkanie-pierwotny-warszawa-ceny.json';
import sprzedazMieszkaniePierwotnyWarszawaLiczba from '../../../data/estates/sprzedaz-mieszkanie-pierwotny-warszawa-liczba.json';
import sprzedazMieszkanieWtornyWarszawaCeny from '../../../data/estates/sprzedaz-mieszkanie-wtorny-warszawa-ceny.json';
import sprzedazMieszkanieWtornyWarszawaLiczba from '../../../data/estates/sprzedaz-mieszkanie-wtorny-warszawa-liczba.json';

import wynajemMieszkanieKrakowCeny from '../../../data/estates/wynajem-mieszkanie-krakow-ceny.json';
import wynajemMieszkanieKrakowLiczba from '../../../data/estates/wynajem-mieszkanie-krakow-liczba.json';
import sprzedazMieszkaniePierwotnyKrakowCeny from '../../../data/estates/sprzedaz-mieszkanie-pierwotny-krakow-ceny.json';
import sprzedazMieszkaniePierwotnyKrakowLiczba from '../../../data/estates/sprzedaz-mieszkanie-pierwotny-krakow-liczba.json';
import sprzedazMieszkanieWtornyKrakowCeny from '../../../data/estates/sprzedaz-mieszkanie-wtorny-krakow-ceny.json';
import sprzedazMieszkanieWtornyKrakowLiczba from '../../../data/estates/sprzedaz-mieszkanie-wtorny-krakow-liczba.json';

import wynajemMieszkanieGdanskCeny from '../../../data/estates/wynajem-mieszkanie-gdansk-ceny.json';
import wynajemMieszkanieGdanskLiczba from '../../../data/estates/wynajem-mieszkanie-gdansk-liczba.json';
import sprzedazMieszkaniePierwotnyGdanskCeny from '../../../data/estates/sprzedaz-mieszkanie-pierwotny-gdansk-ceny.json';
import sprzedazMieszkaniePierwotnyGdanskLiczba from '../../../data/estates/sprzedaz-mieszkanie-pierwotny-gdansk-liczba.json';
import sprzedazMieszkanieWtornyGdanskCeny from '../../../data/estates/sprzedaz-mieszkanie-wtorny-gdansk-ceny.json';
import sprzedazMieszkanieWtornyGdanskLiczba from '../../../data/estates/sprzedaz-mieszkanie-wtorny-gdansk-liczba.json';

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
          <Menu.SubMenu key="wroclaw" title="Mieszkania - Wrocław">
            <Menu.Item key='wynajem-mieszkanie-wroclaw'>Wynajem</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-pierwotny-wroclaw'>Sprzedaż / pierwotny</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-wtorny-wroclaw'>Sprzedaż / wtórny</Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="warszawa" title="Mieszkania - Warszawa">
            <Menu.Item key='wynajem-mieszkanie-warszawa'>Wynajem</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-pierwotny-warszawa'>Sprzedaż / pierwotny</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-wtorny-warszawa'>Sprzedaż / wtórny</Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="krakow" title="Mieszkania - Kraków">
            <Menu.Item key='wynajem-mieszkanie-krakow'>Wynajem</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-pierwotny-krakow'>Sprzedaż / pierwotny</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-wtorny-krakow'>Sprzedaż / wtórny</Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="gdansk" title="Mieszkania - Gdańsk">
            <Menu.Item key='wynajem-mieszkanie-gdansk'>Wynajem</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-pierwotny-gdansk'>Sprzedaż / pierwotny</Menu.Item>
            <Menu.Item key='sprzedaz-mieszkanie-wtorny-gdansk'>Sprzedaż / wtórny</Menu.Item>
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

        { selectedItem === 'wynajem-mieszkanie-warszawa' && (
          <OEstateChart
            dataPrices={wynajemMieszkanieWarszawaCeny}
            dataCount={wynajemMieszkanieWarszawaLiczba}
            titlePrices='Wrocław - Wynajem mieszkań - Cena'
            titleCount='Wrocław - Wynajem mieszkań - Liczba ogłoszeń'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-pierwotny-warszawa' && (
          <OEstateChart
            dataPrices={sprzedazMieszkaniePierwotnyWarszawaCeny}
            titlePrices='Wrocław - Sprzedaż mieszkań (pierwotny) - Cena za mkw'
            dataCount={sprzedazMieszkaniePierwotnyWarszawaLiczba}
            titleCount='Wrocław - Sprzedaż mieszkań (pierwotny) - Liczba ogłoszeń'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-wtorny-warszawa' && (
          <OEstateChart
            dataPrices={sprzedazMieszkanieWtornyWarszawaCeny}
            dataCount={sprzedazMieszkanieWtornyWarszawaLiczba}
            titlePrices='Wrocław - Sprzedaż mieszkań (wtorny) - Ceny za mkw'
            titleCount='Wrocław - Sprzedaż mieszkań (wtorny) - Liczba ogłoszeń'
          />
        )}

        { selectedItem === 'wynajem-mieszkanie-krakow' && (
          <OEstateChart
            dataPrices={wynajemMieszkanieKrakowCeny}
            dataCount={wynajemMieszkanieKrakowLiczba}
            titlePrices='Wrocław - Wynajem mieszkań - Cena'
            titleCount='Wrocław - Wynajem mieszkań - Liczba ogłoszeń'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-pierwotny-krakow' && (
          <OEstateChart
            dataPrices={sprzedazMieszkaniePierwotnyKrakowCeny}
            titlePrices='Wrocław - Sprzedaż mieszkań (pierwotny) - Cena za mkw'
            dataCount={sprzedazMieszkaniePierwotnyKrakowLiczba}
            titleCount='Wrocław - Sprzedaż mieszkań (pierwotny) - Liczba ogłoszeń'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-wtorny-krakow' && (
          <OEstateChart
            dataPrices={sprzedazMieszkanieWtornyKrakowCeny}
            dataCount={sprzedazMieszkanieWtornyKrakowLiczba}
            titlePrices='Wrocław - Sprzedaż mieszkań (wtorny) - Ceny za mkw'
            titleCount='Wrocław - Sprzedaż mieszkań (wtorny) - Liczba ogłoszeń'
          />
        )}

        { selectedItem === 'wynajem-mieszkanie-gdansk' && (
          <OEstateChart
            dataPrices={wynajemMieszkanieGdanskCeny}
            dataCount={wynajemMieszkanieGdanskLiczba}
            titlePrices='Wrocław - Wynajem mieszkań - Cena'
            titleCount='Wrocław - Wynajem mieszkań - Liczba ogłoszeń'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-pierwotny-gdansk' && (
          <OEstateChart
            dataPrices={sprzedazMieszkaniePierwotnyGdanskCeny}
            titlePrices='Wrocław - Sprzedaż mieszkań (pierwotny) - Cena za mkw'
            dataCount={sprzedazMieszkaniePierwotnyGdanskLiczba}
            titleCount='Wrocław - Sprzedaż mieszkań (pierwotny) - Liczba ogłoszeń'
          />
        )}

        { selectedItem === 'sprzedaz-mieszkanie-wtorny-gdansk' && (
          <OEstateChart
            dataPrices={sprzedazMieszkanieWtornyGdanskCeny}
            dataCount={sprzedazMieszkanieWtornyGdanskLiczba}
            titlePrices='Wrocław - Sprzedaż mieszkań (wtorny) - Ceny za mkw'
            titleCount='Wrocław - Sprzedaż mieszkań (wtorny) - Liczba ogłoszeń'
          />
        )}

      </Content>
    </Layout>
  );
}
