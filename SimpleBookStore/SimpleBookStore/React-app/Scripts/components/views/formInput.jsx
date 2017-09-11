import React, { PropTypes } from 'react';
import { Input, NumberInput } from '../libs/linkTags';

export function ValidatedInput(props) {
    const { isNumeric, ...rest } = props;

    return (
    <div className={"form-group " + (props.valueLink.error ? 'has-error' : '')}>
        <label className="control-label" >{props.label}</label>
        {isNumeric ?
            <NumberInput id={props.id} { ...rest } className="form-control" aria-describedby={"help" + props.id} /> :
            <Input id={props.id} { ...rest } className="form-control" aria-describedby={"help" + props.id} />
        }
        <span id={"help" + props.id} className="help-block">
            {props.valueLink.error || ''}
        </span>
    </div>);
};