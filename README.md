# :vertical_traffic_light: traffic-light (v1.0.0)

<p>
  <img alt="Status" src="https://img.shields.io/badge/status-released-green" >
  <img alt="Author" src="https://img.shields.io/badge/author-MaximSinyukov-blue" />
</p>

## Что нового:grey_question:
- Изменен сборщик проекта с `webpack` до `vite`
- Обновлен vue с vue2 до `vue3`
- Добавлен редирект со всех несуществующих роутов на стандартный `/red` или уже сохраненный

## :book: Суть проекта

В проекте был сверстан небольшой макет светофора. Он выполняет все свои функции и не только! В работе были добавлены дополнительные функциональности. А подробнее дальше:

* был настроен роутинг приложения, а именно: `/red`, `/yellow`, `/green` с изменением текущего сигнала соответственно
* при смене сигнала меняется `роут`
* время сигналов по умолчанию `red - 10s`, `yellow - 3s`, `green - 15s`
* в последние 3 секунды сигнала начинается `мигание` текущего сигнала
* на желтом сигнале мигание отсутствует
* светофор работает в цикле `красный('/red') -> желтый('/yellow') -> зеленый('/green') -> желтый('/yellow') -> красный('/red') -> желтый('/yellow') и т.д.`
* на каждом сигнале реализован `таймер` до его смены
* создан `чекбокс`, который позволяет сохранять последнее состояние светофора в `localStorage`, чтобы в дальнейшем можно было вновь открыть приложение на том же месте
* `webpack dev-Server` автоматически открывает в браузере приложение на роуте `/red` или последнем состоянии (при включенном чекбоксе)

## :heavy_exclamation_mark: Важно

* если вы хотите запустить конкретный сигнал через `URL` (таймер будет установлен по умолчанию), то необходимо отключить чекбокс на сохранение последнего состояния

## :wrench: О работе с проектом

1. Перед работой установите необходимые зависимости через - `npm install`
2. Для локального запуска проекта используйте - `npm run start`
3. Для итоговой сборки проекта воспользуйтесь - `npm run build`

## :bookmark_tabs: Стек

- JavaScript
- HTML
- CSS
- Vue.js
- Vue Router

## :mag_right: Полученные навыки

* создание проектов с помощью `vue create <project-name>` или `winpty vue.cmd create <project-name>`
* проброска пропсов через компоненты vue.js
* работа с методами жизненного цикла компонентов
* работа с vue router
* работа со слушателями событий на vue компонентах
* создание пользовательских методов для работы с приложением
* небольшая настройка `webpack` через `vue.config`
