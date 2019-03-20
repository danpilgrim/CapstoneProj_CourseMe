//
//  Post.swift
//  PuertoRicoApp
//
//  Created by preethi Reddy on 12/16/17.
//  Copyright © 2017 MNM. All rights reserved.
//

import Foundation
import MapKit

class Post: NSObject, MKAnnotation {
    var title: String?
    var postedDate: String!
    let coordinate: CLLocationCoordinate2D
    var latitude: Double!
    var longitude: Double!
    
    init(title: String, postedDate: String, coordinate: CLLocationCoordinate2D) {
        self.title = title
        self.postedDate = postedDate
        self.coordinate = coordinate
        super.init()
    }
}

