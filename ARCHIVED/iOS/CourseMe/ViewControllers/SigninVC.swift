//
//  SigninVC.swift
//  CourseMe
//
//  Created by danz on 12/18/17.
//  Copyright © 2017 openar. All rights reserved.
//

import UIKit
import Firebase
import SwiftKeychainWrapper

class SigninVC: UIViewController {

    
    @IBOutlet weak var mainImage: UIImageView!
    @IBOutlet weak var usernameField: UITextField!
    @IBOutlet weak var emailField: UITextField!
    @IBOutlet weak var passwordField: UITextField!
    @IBOutlet weak var signInButton: UIButton!
    
    //global variables
    var ref = Database.database().reference()
    
    override func viewDidAppear(_ animated: Bool) {
        if let _ = KeychainWrapper.standard.string(forKey: "uid"){
            self.performSegue(withIdentifier: "toFeed", sender: nil);
        }
    }
    
    func storeUserData(userID: String){
        let downloadURL = String!
        
        let uploadTask = rivers.Ref.putData(data, metadata: nil) { (metadata, error)
            in guard let metadata = metadata else {
                return
            }
            downloadURL = metadata.downloadUL
        }
        
        self.ref.child("users").child(userID).setValue([
            "username": usernameField.text,
            "userImg": imageURL
            ])
    }
    
    
    @IBAction func SignInPress(_ sender: Any) {
        if let email = emailField.text, let password = passwordField.text{
            Auth.auth().signIn(withEmail: email, password: password){ (user, error) in
                if (error != nil && !(self.usernameField.text?.isEmpty)! && self.mainImage.image != nil) {
                    Auth.auth().createUser(withEmail: email, password: password) { (user, error) in
                        self.storeUserData(userID: (user?.uid)!);
                        let saveSuccessful: Bool = KeychainWrapper.standard.set((user?.uid)!, forKey: "KEY_UID");
                        self.performSegue(withIdentifier: "toFeed", sender: nil);
                    }
                }else{
                    if let userID = user?.uid{
                        let saveSuccessful: Bool = KeychainWrapper.standard.set(userID, forKey: "KEY_UID");
                        self.performSegue(withIdentifier: "toFeed", sender: nil);
                    }
                    
                }
            }
        }
        
        
    }
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
