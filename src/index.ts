import {
  QMainWindow,
  QWidget,
  QLabel,
  QScrollArea,
  ScrollBarPolicy,
  QGridLayout,
} from '@nodegui/nodegui';
import { Configuration } from './services/configuration';
import { ModService } from './services/modService';

const config: Configuration = new Configuration();
const modService: ModService = new ModService(
  config.getConfig().modPath,
  config.getConfig().simsModPath
);

const win = new QMainWindow();
win.setWindowTitle('Sims Mod Switcher');

const scrollArea = new QScrollArea();
scrollArea.setVerticalScrollBarPolicy(ScrollBarPolicy.ScrollBarAlwaysOn);
//scrollArea.setInlineStyle('flex: 1; width: "100%";');

const centralWidget = new QWidget();
centralWidget.setObjectName('myroot');
const rootLayout = new QGridLayout();
centralWidget.setLayout(rootLayout);

const label = new QLabel();
label.setObjectName('mylabel');
label.setText('Hello Beautiful!');

rootLayout.addWidget(label);
let row = 1;
let col = 0;
modService.getMods().forEach((mod) => {
  rootLayout.addWidget(mod.getCheckBox(), row, col);
  col = col == 0 ? 1 : 0;
  row += col == 0 ? 1 : 0;
});

//rootLayout.addWidget(scrollArea);
scrollArea.setWidget(centralWidget);
//win.setCentralWidget(scrollArea);
win.setCentralWidget(scrollArea);
win.setStyleSheet(
  `
    #myroot {
      background-color: #7581ff;
      padding: 20;
      flex: 1;
      text-align: left;
      height: 600px;
      width: 600px;
    }
    #mylabel {
      font-size: 16px;
      font-weight: bold;
      padding: 1;
      flex: 1;
    }
  `
);
win.show();

(global as any).win = win;
