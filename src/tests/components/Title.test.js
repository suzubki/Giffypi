import React from 'react';
import {shallow} from 'enzyme';
import {Title} from '../../components/Title';


describe('Debería mostrar solo el wrapper', () => { 
    test('mostrando el wrapper', () => { 
        const wrapper = shallow( <Title /> )

        expect(wrapper).toMatchSnapshot()

     })
 })