import { Component, OnInit } from '@angular/core';
import * as ace from 'ace-builds';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `<h1>Hello world!</h1>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'homes';
  editor!: ace.Ace.Editor;

  ngOnInit(): void {
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.24.1/src-noconflict/'
    );
    ace.require('ace/ext/language_tools');
    this.editor = ace.edit('editor');
    this.editor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true
    });
    this.editor.session.setMode('ace/mode/haskell');
    // this.editor.setKeyboardHandler('ace/keyboard/standard');
    this.editor.setTheme('ace/theme/chrome');
    this.editor.setValue(
      `
      module Template where


data MyBool = MyTrue
            | MyFalse

data Exp = Const MyBool
         | And Exp Exp
         | Or Exp Exp
         

-- -------------------------------------------------
-- Equality Checking
-- -------------------------------------------------

instance Eq MyBool where
  (==) MyTrue MyTrue = True
  (==) MyFalse MyFalse = True
  (==) _ _ = False

instance Eq Exp where
  (==) (Const bool) (Const bool2) = bool == bool2
  (==) (And ex1 ex2) (And ex3 ex4) = ex1 == ex3 && ex2 == ex4
  (==) (Or ex1 ex2) (Or ex3 ex4) = ex1 == ex3 && ex2 == ex4
  (==) _ _ = False

-- -------------------------------------------------
-- Printing
-- -------------------------------------------------

instance Show MyBool where
  show MyTrue = "True"
  show MyFalse = "False"

instance Show Exp where
  show (Const bool) = show bool
  show (And ex1 ex2) = show ex1 ++ " && " ++ show ex2
  show (Or ex1 ex2) = show ex1 ++ " || " ++ show ex2

-- -------------------------------------------------
-- Evaluating
-- -------------------------------------------------

class Evaluatable a where
  eval :: a -> Bool

instance Evaluatable MyBool where
  eval MyTrue = True
  eval MyFalse = False

instance Evaluatable Exp where
  eval (Const bool) = eval bool
  eval (And ex1 ex2) = eval ex1 && eval ex2
  eval (Or ex1 ex2) = eval ex1 || eval ex2
      
      `
    );
    this.editor.gotoLine(0, 0, true);
  }
}
